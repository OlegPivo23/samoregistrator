<template>
  <MainLayout>
    <div class="flex flex-col gap-4 p-6">
      <router-link
        :to="`/question/${question.id}`"
        v-for="question in questions"
        :key="question.id"
      >
        <div
          class="w-full bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:shadow-xl"
        >
          <div class="p-6">
            <p class="text-lg font-semibold text-gray-800">Карточка {{ question.id }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from 'src/layouts/MainLayout.vue'
import { ref } from 'vue'

const questions = ref([{ id: 1 }, { id: 2 }, { id: 3 }])
</script>
