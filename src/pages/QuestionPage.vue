<template>
  <MainLayout>
    <q-card class="mt-6 max-w-[600px] w-full mx-auto">
      <q-card-section v-if="loading">
        <q-spinner-dots color="primary" size="50px" />
      </q-card-section>
      <q-card-section v-else>
        <h1 class="text-h5">{{ form.title }}</h1>
        <p class="q-mt-sm text-body2">{{ form.note }}</p>

        <div v-for="question in form.questions" :key="question.id" class="q-mt-md">
          <q-card-section>
            <h3 class="text-h6">{{ question.body }}</h3>
            <p class="text-body2">{{ question.note }}</p>

            <!-- Для одиночного выбора -->
            <q-option-group
              v-if="question.question_type === 'ONE_O'"
              :options="getOptions(question)"
              type="radio"
              v-model="answers[question.id]"
              class="q-mt-sm"
            />

            <!-- Для множественного выбора -->
            <q-option-group
              v-else-if="question.question_type === 'MUL_O'"
              :options="getOptions(question)"
              type="checkbox"
              v-model="answers[question.id]"
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQuestionStore } from 'src/stores/questionStore'
import { QCard, QCardSection, QCardActions, QBtn, QOptionGroup } from 'quasar'
import MainLayout from 'src/layouts/MainLayout.vue'

const route = useRoute()
const questionStore = useQuestionStore()
const loading = ref(true)
const form = ref({})
const answers = ref({})

const initAnswers = () => {
  form.value.questions?.forEach((question) => {
    answers.value[question.id] = question.question_type === 'MUL_O' ? [] : null
  })
}

const getOptions = (question) => {
  return question.answers.map((answer) => ({
    label: answer.body,
    value: answer.id,
  }))
}

onMounted(async () => {
  await questionStore.fetchQuestionDetails(route.params.id)
  form.value = questionStore.question
  initAnswers()
  loading.value = false
})

const submitAnswer = () => {
  const formattedAnswers = Object.entries(answers.value).map(([questionId, answerIds]) => ({
    question_id: Number(questionId),
    answer_ids: Array.isArray(answerIds) ? answerIds : [answerIds],
  }))

  console.log('Ответы на форму:', formattedAnswers)
}
</script>
