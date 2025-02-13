<template>
  <MainLayout>
    <q-card class="mt-6 max-w-[600px] w-full mx-auto">
      <q-card-section v-if="loading">
        <q-spinner-dots color="primary" size="50px" />
      </q-card-section>
      <q-card-section v-else>
        <h1 class="text-h5">Вопрос: {{ question.title }}</h1>
        <p class="q-mt-sm text-body2">{{ question.note }}</p>
      </q-card-section>
      <q-card-section>
        <h2>Ответ</h2>
        <q-input
          v-model="answer"
          type="textarea"
          label="Ваш ответ"
          :rows="5"
          outlined
          class="q-mt-md"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Отправить" color="primary" @click="submitAnswer" />
      </q-card-actions>
    </q-card>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { QCard, QCardSection, QCardActions, QBtn, QInput } from 'quasar'
import MainLayout from 'src/layouts/MainLayout.vue'

const route = useRoute()
const question = ref({})
const answer = ref('')
const loading = ref(true)

const questionId = route.params.id

const fetchQuestionDetails = async () => {
  try {
    const response = await axios.get(`http://45.87.247.139:8000/api/forms/${questionId}/`)
    question.value = response.data || {}
  } catch (error) {
    console.error('Ошибка при загрузке вопроса:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchQuestionDetails)

const submitAnswer = () => {
  console.log('Ответ на вопрос:', answer.value)
}
</script>
