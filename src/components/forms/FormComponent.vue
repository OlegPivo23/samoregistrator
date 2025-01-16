<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
      <form @submit.prevent="handleSubmit" class="space-y-2">
        <h2
          v-if="activeForm === 'login'"
          class="text-xl font-semibold text-center text-gray-800 uppercase tracking-wide"
        >
          Войти
        </h2>
        <h2
          v-if="activeForm === 'register'"
          class="text-xl font-semibold text-center text-gray-800 uppercase tracking-wide"
        >
          Регистрация
        </h2>
        <h2
          v-if="activeForm === 'forgot'"
          class="text-xl font-semibold text-center text-gray-800 uppercase tracking-wide"
        >
          Восстановление пароля
        </h2>

        <div v-for="(field, index) in formConfigurations[activeForm]" :key="index">
          <label :for="field.model" class="block text-sm font-medium text-gray-700 mb-1">
            {{ field.label }}
          </label>
          <q-input
            v-model="formFields[field.model]"
            :type="field.type"
            :id="field.model"
            class="w-full"
            :error="!!errors[field.error]"
            :error-message="errors[field.error]"
            :label="field.label"
            outlined
          />
        </div>

        <div>
          <q-btn
            :disabled="!isValid"
            type="submit"
            :label="
              activeForm === 'login'
                ? 'Войти'
                : activeForm === 'register'
                  ? 'Зарегистрироваться'
                  : 'Восстановить пароль'
            "
            color="primary"
            class="w-full"
          />
        </div>
      </form>

      <div
        class="text-center space-y-2 mt-4"
        v-for="(button, index) in buttonConfigurations[activeForm]"
        :key="index"
      >
        <q-btn
          @click="switchForm(button.targetForm)"
          flat
          :label="button.label"
          color="primary"
          class="w-full"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { QInput, QBtn } from 'quasar'

const activeForm = ref('login')

const formConfigurations = ref({
  login: [
    { label: 'Имя', type: 'text', model: 'name', error: 'nameError' },
    { label: 'Пароль', type: 'password', model: 'password', error: 'passwordError' },
  ],
  register: [
    { label: 'Имя', type: 'text', model: 'name', error: 'nameError' },
    { label: 'Пароль', type: 'password', model: 'password', error: 'passwordError' },
    {
      label: 'Подтвердите пароль',
      type: 'password',
      model: 'confirmPassword',
      error: 'confirmPasswordError',
    },
  ],
  forgot: [{ label: 'Email', type: 'email', model: 'email', error: 'emailError' }],
})

const formFields = ref({
  name: '',
  password: '',
  confirmPassword: '',
  email: '',
})

const errors = ref({
  nameError: '',
  passwordError: '',
  confirmPasswordError: '',
  emailError: '',
})

const buttonConfigurations = ref({
  login: [
    { label: 'Забыли пароль?', targetForm: 'forgot' },
    { label: 'Нет аккаунта? Регистрация', targetForm: 'register' },
  ],
  forgot: [
    { label: 'Уже вспомнили пароль? Войти', targetForm: 'login' },
    { label: 'Нет аккаунта? Регистрация', targetForm: 'register' },
  ],
  register: [
    { label: 'Уже есть аккаунт? Войти', targetForm: 'login' },
    { label: 'Забыли пароль?', targetForm: 'forgot' },
  ],
})

const isValid = computed(() => {
  if (activeForm.value === 'login') {
    return formFields.value.name && formFields.value.password
  } else if (activeForm.value === 'register') {
    return (
      formFields.value.name &&
      formFields.value.password &&
      formFields.value.confirmPassword &&
      formFields.value.password === formFields.value.confirmPassword
    )
  } else if (activeForm.value === 'forgot') {
    return formFields.value.email
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
