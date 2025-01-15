<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <form
      @submit.prevent="handleSubmit(submitForm)"
      class="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
    >
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Имя</label>
        <input
          v-model="name"
          type="text"
          id="name"
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': nameError }"
        />
        <p v-if="nameError" class="text-xs text-red-500">{{ nameError }}</p>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': passwordError }"
        />
        <p v-if="passwordError" class="text-xs text-red-500">{{ passwordError }}</p>
      </div>

      <div>
        <button
          type="submit"
          :disabled="!isValid"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Отправить
        </button>
      </div>
    </form>
  </div>
</template>

<script setup></script>
