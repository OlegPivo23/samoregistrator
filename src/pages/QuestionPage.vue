<template>
  <MainLayout>
    <q-card class="mt-6 max-w-[600px] w-full mx-auto">
      <q-card-section v-if="loading">
        <q-spinner-dots color="primary" size="50px" />
      </q-card-section>
      <q-card-section v-else>
        <h1 class="text-h5">Опрос</h1>

        <!-- Отображаем только текущий вопрос -->
        <div v-if="currentQuestion" class="q-mt-md">
          <q-card-section>
            <h3 class="text-h6">{{ currentQuestion.title }}</h3>

            <!-- Обычные вопросы с вариантами ответов -->
            <q-option-group
              v-if="currentQuestion.type === 'ONE'"
              :options="getOptions(currentQuestion)"
              type="radio"
              v-model="answers[currentQuestion.node_id]"
              class="q-mt-sm"
            />

            <q-option-group
              v-else-if="currentQuestion.type === 'MULTIPLE'"
              :options="getOptions(currentQuestion)"
              type="checkbox"
              v-model="answers[currentQuestion.node_id]"
              class="q-mt-sm"
            />

            <!-- Текстовый вопрос -->
            <q-input
              v-else-if="currentQuestion.type === 'TEXT'"
              v-model="answers[currentQuestion.node_id]"
              type="text"
              label="Введите ответ"
              class="q-mt-sm"
            />
          </q-card-section>
        </div>

        <q-card-actions align="right">
          <q-btn label="Отправить" color="primary" @click="submitAnswer" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuestionStore } from 'src/stores/questionStore'
import { QCard, QCardSection, QCardActions, QBtn, QOptionGroup, QInput } from 'quasar'
import MainLayout from 'src/layouts/MainLayout.vue'

const questionStore = useQuestionStore()
const route = useRoute()
const algorithmId = computed(() => route.query.algorithm_id)
const loading = ref(true)
const questions = ref([])
const answers = ref({})

// Текущий вопрос
const currentQuestion = computed(() => questions.value[0])

const getOptions = (question) => {
  if (!question.answers) return []
  return Object.entries(question.answers).map(([id, answer]) => ({
    label: answer.title,
    value: Number(id), // или String(id), если id должен быть строкой
  }))
}

onMounted(async () => {
  if (algorithmId.value) {
    await questionStore.fetchQuestionDetails(algorithmId.value)
    questions.value = questionStore.question.nodes

    // Инициализация answers для множественного выбора
    questions.value.forEach((question) => {
      if (question.type === 'MULTIPLE') {
        answers.value[question.node_id] = []
      }
    })
    loading.value = false
  }
})

watch(
  [() => answers.value, () => currentQuestion.value],
  ([newAnswers, newCurrentQuestion]) => {
    console.log('Текущие ответы:', newAnswers, 'Тип данных:', typeof newAnswers)
    console.log('Текущий вопрос:', newCurrentQuestion, 'Тип данных:', typeof newCurrentQuestion)
  },
  { deep: true },
)

async function submitAnswer() {
  const selectedEntries = Object.entries(answers.value)

  if (selectedEntries.length === 0) {
    console.error('Ошибка: Нет выбранных ответов')
    return
  }

  const values = selectedEntries.reduce((acc, [questionId, selected]) => {
    const question = questions.value.find((q) => q.node_id == questionId)
    if (!question) return acc

    if (question.type === 'ONE') {
      acc = selected
    } else if (question.type === 'MULTIPLE') {
      acc = Array.isArray(selected) ? selected : [selected]
    } else if (question.type === 'TEXT') {
      acc = selected.toString()
    }
    return acc
  }, [])

  const data = {
    question: questions.value[0].node_id,
    values,
    response_type: questions.value.map((q) => q.type).toString(),
    user: 1,
    algorithm: Number(algorithmId.value),
  }

  try {
    const nextQuestion = await questionStore.postAnswer(data, algorithmId.value)
    if (nextQuestion) {
      questions.value = [nextQuestion]
      answers.value = {} // Сбрасываем ответы

      // Добавляем инициализацию для нового вопроса
      questions.value.forEach((question) => {
        if (question.type === 'MULTIPLE') {
          answers.value[question.node_id] = [] // Инициализируем массив
        }
      })
    } else {
      console.log('Опрос завершен')
      
    }
  } catch (error) {
    console.error('Ошибка при отправке ответа:', error)
  }
}
</script>
