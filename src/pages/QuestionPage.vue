<template>
  <MainLayout>
    <q-card class="mt-6 max-w-[600px] w-full mx-auto">
      <q-card-section>
        <h1 class="text-h5">Вопрос {{ id }}</h1>
        <p class="q-mt-sm text-body2">Описание вопроса или текст вопроса...</p>
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
    <q-card class="mt-6 max-w-[600px] w-full mx-auto">
      <q-card-section>
        <h1 class="text-h5">Вопрос {{ id }}</h1>
        <p class="q-mt-sm text-body2">Описание вопроса или текст вопроса...</p>
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
import { ref } from 'vue'
import { QCard, QCardSection, QCardActions, QBtn, QInput } from 'quasar'
import MainLayout from 'src/layouts/MainLayout.vue'

defineProps({
  id: String, 
})

const answer = ref('')

const submitAnswer = () => {
  console.log('Ответ на вопрос:', answer.value)
}
</script>
