<script setup>
import { ref, computed } from 'vue'
import { QInput, QBtn } from 'quasar'

const activeForm = ref('login') // Хранит активную форму: 'login', 'register', 'forgot'

const name = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')

const nameError = ref('')
const passwordError = ref('')
const emailError = ref('')
const confirmPasswordError = ref('')

const isValid = computed(() => {
  if (activeForm.value === 'login') {
    return name.value && password.value
  } else if (activeForm.value === 'register') {
    return (
      name.value &&
      password.value &&
      confirmPassword.value &&
      password.value === confirmPassword.value
    )
  } else if (activeForm.value === 'forgot') {
    return email.value
  }
  return false
})

const handleSubmit = () => {
  if (activeForm.value === 'login') {
    alert('Вы вошли в систему!')
  } else if (activeForm.value === 'register') {
    alert('Вы зарегистрировались!')
  } else if (activeForm.value === 'forgot') {
    alert('Инструкция по восстановлению пароля отправлена на ваш email!')
  }
}

const switchForm = (formName) => {
  activeForm.value = formName
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
      <form v-if="activeForm === 'login'" @submit.prevent="handleSubmit" class="space-y-4">
        <h2>Войти</h2>
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Имя</label>
          <q-input
            v-model="name"
            type="text"
            id="name"
            class="mt-1 w-full"
            :error="!!nameError"
            :error-message="nameError"
            label="Имя"
            outlined
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
          <q-input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 w-full"
            :error="!!passwordError"
            :error-message="passwordError"
            label="Пароль"
            outlined
          />
        </div>

        <div>
          <q-btn :disabled="!isValid" type="submit" label="Войти" color="primary" class="w-full" />
        </div>
      </form>

      <form v-if="activeForm === 'register'" @submit.prevent="handleSubmit" class="space-y-4">
        <h2>Регистрация</h2>
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Имя</label>
          <q-input
            v-model="name"
            type="text"
            id="name"
            class="mt-1 w-full"
            :error="!!nameError"
            :error-message="nameError"
            label="Имя"
            outlined
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
          <q-input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 w-full"
            :error="!!passwordError"
            :error-message="passwordError"
            label="Пароль"
            outlined
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700"
            >Подтвердите пароль</label
          >
          <q-input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="mt-1 w-full"
            :error="!!confirmPasswordError"
            :error-message="confirmPasswordError"
            label="Подтвердите пароль"
            outlined
          />
        </div>

        <div>
          <q-btn
            :disabled="!isValid"
            type="submit"
            label="Зарегистрироваться"
            color="primary"
            class="w-full"
          />
        </div>
      </form>

      <form v-if="activeForm === 'forgot'" @submit.prevent="handleSubmit" class="space-y-4">
        <h2>Восстановление пароля</h2>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <q-input
            v-model="email"
            type="email"
            id="email"
            class="mt-1 w-full"
            :error="!!emailError"
            :error-message="emailError"
            label="Email"
            outlined
          />
        </div>

        <div>
          <q-btn
            :disabled="!isValid"
            type="submit"
            label="Восстановить пароль"
            color="primary"
            class="w-full"
          />
        </div>
      </form>

      <div v-if="activeForm === 'login'">
        <div class="text-center mt-4">
          <q-btn @click="switchForm('forgot')" flat label="Забыли пароль?" color="primary" />
        </div>
        <div class="text-center mt-4">
          <q-btn
            @click="switchForm('register')"
            flat
            label="Нет аккаунта? Регистрация"
            color="primary"
          />
        </div>
      </div>

      <div v-if="activeForm === 'forgot'">
        <div class="text-center mt-4">
          <q-btn
            @click="switchForm('login')"
            flat
            label="Уже вспомнили пароль? Войти"
            color="primary"
          />
        </div>
        <div class="text-center mt-4">
          <q-btn
            @click="switchForm('register')"
            flat
            label="Нет аккаунта? Регистрация"
            color="primary"
          />
        </div>
      </div>

      <div v-if="activeForm === 'register'">
        <div class="text-center mt-4">
          <q-btn
            @click="switchForm('login')"
            flat
            label="Уже есть аккаунт? Войти"
            color="primary"
          />
        </div>
        <div class="text-center mt-4">
          <q-btn @click="switchForm('forgot')" flat label="Забыли пароль?" color="primary" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition:
    color 0.3s ease-in-out,
    transform 0.3s ease-in-out;
}

h2:hover {
  color: #007aff;
  transform: translateY(-5px);
}
</style>
