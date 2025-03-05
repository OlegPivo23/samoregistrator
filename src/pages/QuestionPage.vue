<template>
  <MainLayout>
    <q-card class="mt-6 max-w-[600px] w-full mx-auto">
      <q-card-section v-if="loading">
        <q-spinner-dots color="primary" size="50px" />
      </q-card-section>
      <q-card-section v-else>
        <h1 class="text-h5">Опрос</h1>

        <div v-for="question in questions" :key="question.node_id" class="q-mt-md">
          <q-card-section>
            <h3 class="text-h6">{{ question.title }}</h3>

            <!-- Обычные вопросы с вариантами ответов -->
            <q-option-group
              v-if="question.type === 'ONE'"
              :options="getOptions(question)"
              type="radio"
              v-model="answers[question.node_id]"
              class="q-mt-sm"
            />

            <q-option-group
              v-else-if="question.type === 'MUL'"
              :options="getOptions(question)"
              type="checkbox"
              v-model="answers[question.node_id]"
              class="q-mt-sm"
            />

            <!-- Текстовый вопрос -->
            <q-input
              v-else-if="question.type === 'TEXT'"
              v-model="answers[question.node_id]"
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
import { ref, onMounted, computed } from 'vue'
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

const getOptions = (question) => {
  return Object.entries(question.answers).map(([id, answer]) => ({
    label: answer.title,
    value: Number(id),
  }))
}

onMounted(async () => {
  if (algorithmId.value) {
    await questionStore.fetchQuestionDetails(algorithmId.value)
    questions.value = questionStore.question.nodes
    loading.value = false
  }
})

function submitAnswer() {
  const selectedEntries = Object.entries(answers.value)

  if (selectedEntries.length === 0) {
    console.error('Ошибка: Нет выбранных ответов')
    return
  }

  const values = selectedEntries.reduce((acc, [questionId, selected]) => {
    const question = questions.value.find((q) => q.node_id == questionId)
    if (!question) return acc

    if (question.type === 'ONE') {
      acc.push({
        question_id: Number(questionId),
        answer_id: Number(selected),
      })
    } else if (question.type === 'MUL') {
      acc.push({
        question_id: Number(questionId),
        answer_id: Array.isArray(selected) ? selected : [selected],
      })
    } else if (question.type === 'TEXT') {
      acc.push({
        question_id: Number(questionId),
        answer_text: selected,
      })
    }
    return acc
  }, [])

  const data = {
    question: questions.value.map((q) => q.node_id),
    values,
    response_type: questions.value.map((q) => q.type).toString(),
    user: 1,
    algorithm: Number(algorithmId.value),
  }

  // Отправка данных
  questionStore.postAnswer(data, algorithmId.value)
  console.log('Отправляемые данные:', data)
}
</script>
