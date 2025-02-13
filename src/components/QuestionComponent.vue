<template>
  <div class="flex flex-col gap-4">
    <router-link v-for="question in questions" :to="`/question/${question.id}`" :key="question.id">
      <div
        class="w-full bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:shadow-2xl"
      >
        <div class="p-6">
          <p class="text-lg font-semibold text-gray-800 truncate">{{ question.title }}</p>
          <p class="text-gray-600 text-sm mt-2 truncate">{{ question.note }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  questions: {
    type: Array,
    required: true,
  },
})
</script>
