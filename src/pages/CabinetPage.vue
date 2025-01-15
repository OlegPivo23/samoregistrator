<script setup>
import MainLayout from 'src/layouts/MainLayout.vue'
import { ref } from 'vue'
import { QInput, QBtn } from 'quasar'

const formData = ref({
  name: 'Иван Иванов',
  password: '',
  confirmPassword: '',
  email: '',
  phone: '',
})

const activeTab = ref('profile') // Переменная для отслеживания активной вкладки

// Функция для сохранения данных профиля
const saveProfile = () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    alert('Пароли не совпадают!')
    return
  }

  alert('Данные успешно сохранены!')
  console.log('Сохранённые данные:', formData.value)
}

// Функция для сохранения контактных данных
const saveContactInfo = () => {
  alert('Контактные данные успешно сохранены!')
  console.log('Сохранённые контактные данные:', formData.value)
}
</script>

<template>
  <MainLayout>
    <div class="min-h-screen flex justify-center items-center bg-gray-100">
      <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-700 text-center mb-6">Личный кабинет</h2>

        <!-- Табы -->
        <div class="mb-6">
          <ul class="flex justify-center border-b border-gray-300">
            <li
              :class="{ 'border-b-2 border-blue-500': activeTab === 'profile' }"
              class="mr-6 cursor-pointer py-2 text-sm text-gray-600 hover:text-blue-500"
              @click="activeTab = 'profile'"
            >
              Редактировать профиль
            </li>
            <li
              :class="{ 'border-b-2 border-blue-500': activeTab === 'contact' }"
              class="cursor-pointer py-2 text-sm text-gray-600 hover:text-blue-500"
              @click="activeTab = 'contact'"
            >
              Контактные данные
            </li>
          </ul>
        </div>

        <!-- Форма для редактирования профиля -->
        <div v-if="activeTab === 'profile'">
          <form @submit.prevent="saveProfile" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Имя</label>
              <q-input
                v-model="formData.name"
                type="text"
                id="name"
                class="mt-1 w-full"
                label="Имя"
                outlined
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700"
                >Новый пароль</label
              >
              <q-input
                v-model="formData.password"
                type="password"
                id="password"
                class="mt-1 w-full"
                label="Новый пароль"
                outlined
              />
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700"
                >Подтвердите пароль</label
              >
              <q-input
                v-model="formData.confirmPassword"
                type="password"
                id="confirmPassword"
                class="mt-1 w-full"
                label="Подтвердите пароль"
                outlined
              />
            </div>

            <div>
              <q-btn type="submit" label="Сохранить" color="primary" class="w-full" />
            </div>
          </form>
        </div>

        <!-- Форма для редактирования контактных данных -->
        <div v-if="activeTab === 'contact'">
          <form @submit.prevent="saveContactInfo" class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <q-input
                v-model="formData.email"
                type="email"
                id="email"
                class="mt-1 w-full"
                label="Email"
                outlined
              />
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Телефон</label>
              <q-input
                v-model="formData.phone"
                type="text"
                id="phone"
                class="mt-1 w-full"
                label="Телефон"
                outlined
              />
            </div>

            <div>
              <q-btn type="submit" label="Сохранить" color="primary" class="w-full" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
