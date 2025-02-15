<script setup>
import { computed, ref } from 'vue'
import { QInput, QBtn } from 'quasar'

const formData = ref({
  email: '',
  phone: '',
})

const fieldErrors = ref({
  email: '',
  phone: '',
})

const contactFields = ref([
  {
    label: 'Email',
    model: 'email',
    type: 'email',
    mask: '',
    validate: () => {
      const value = formData.value.email.trim()
      if (!value) {
        fieldErrors.value.email = 'Поле обязательно для заполнения'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        fieldErrors.value.email = 'Некорректный email'
      } else {
        fieldErrors.value.email = ''
      }
    },
  },
  {
    label: 'Телефон',
    model: 'phone',
    type: 'text',
    mask: '+7 (###) ###-##-##',
    validate: () => {
      const value = formData.value.phone.trim()
      fieldErrors.value.phone = value.length === 18 ? '' : 'Введите корректный номер телефона'
    },
  },
])

const validateForm = () => {
  contactFields.value.forEach((field) => field.validate())
  return Object.values(fieldErrors.value).every((error) => error === '')
}

const saveContactInfo = () => {
  if (!validateForm()) {
    alert('Пожалуйста, исправьте ошибки в форме.')
    return
  }
  alert('Контактные данные успешно сохранены!')
  console.log('Сохранённые контактные данные:', formData.value)
}

const isFormValid = computed(() => {
  return (
    Object.values(fieldErrors.value).every((error) => error === '') &&
    formData.value.email &&
    formData.value.phone.length === 18
  )
})
</script>

<template>
  <form @submit.prevent="saveContactInfo" class="space-y-4">
    <div v-for="(field, index) in contactFields" :key="index">
      <label :for="field.model" class="block text-sm font-medium text-gray-700">
        {{ field.label }}
      </label>
      <q-input
        v-model="formData[field.model]"
        :type="field.type"
        :id="field.model"
        class="mt-1 w-full"
        :label="field.label"
        outlined
        :mask="field.mask"
        :error="!!fieldErrors[field.model]"
        :error-message="fieldErrors[field.model]"
        @blur="field.validate"
        clearable
      />
    </div>
    <div>
      <q-btn
        type="submit"
        label="Сохранить"
        color="primary"
        class="w-full"
        :disable="!isFormValid"
      />
    </div>
  </form>
</template>
