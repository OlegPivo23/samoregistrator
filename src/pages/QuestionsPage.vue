<template>
  <MainLayout>
    <div class="flex flex-col gap-4 p-6">
      <q-spinner-dots v-if="questionsStore.loading" color="primary" size="50px" />
      <QuestionComponent v-else :questions="questions" />
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from 'src/layouts/MainLayout.vue'
import { useQuestionStore } from 'src/stores/questionStore'
import { computed, onMounted } from 'vue'
import { QSpinnerDots } from 'quasar'
import QuestionComponent from 'src/components/QuestionComponent.vue'

const questionsStore = useQuestionStore()

const questions = computed(() => questionsStore.getAllQuestions)

onMounted(async () => {
  try {
    await questionsStore.fetchAllQuestions()
  } catch (error) {
    console.error('Ошибка загрузки вопросов:', error)
  }
})
</script>
