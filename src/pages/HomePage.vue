<script setup>
import MainLayout from 'src/layouts/MainLayout.vue'
import { ref } from 'vue'

const questions = ref([
  {
    question: 'Какой цвет неба?',
    options: ['Синий', 'Зелёный', 'Красный', 'Жёлтый'],
    selected: null,
  },
  {
    question: 'Сколько дней в неделе?',
    options: ['5', '6', '7', '8'],
    selected: null,
  },
  {
    question: 'Что течёт в реке?',
    options: ['Молоко', 'Вода', 'Мёд', 'Кефир'],
    selected: null,
  },
])

// Обработка нажатия на кнопку "Отправить"
const submitAnswers = () => {
  console.log('Ответы пользователя:', questions.value)
  alert('Ответы сохранены! Проверьте консоль для подробностей.')
}
</script>

<template>
  <MainLayout>
    <div class="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div class="max-w-3xl w-full p-6 bg-white rounded-lg shadow-md space-y-6">
        <!-- Заголовок -->
        <div class="text-center text-2xl font-bold text-gray-700">Вопросы и ответы</div>

        <!-- Список вопросов -->
        <div class="space-y-4">
          <div
            v-for="(q, index) in questions"
            :key="index"
            class="p-4 bg-gray-50 border border-gray-200 rounded-lg"
          >
            <div class="text-lg font-medium text-gray-700 mb-4">{{ q.question }}</div>
            <div class="space-y-2">
              <label v-for="option in q.options" :key="option" class="flex items-center space-x-2">
                <input
                  type="radio"
                  :value="option"
                  v-model="q.selected"
                  class="text-blue-500 focus:ring-blue-400"
                />
                <span class="text-gray-600">{{ option }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Кнопка отправки -->
        <div class="text-center">
          <button
            @click="submitAnswers"
            class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Отправить ответы
          </button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
