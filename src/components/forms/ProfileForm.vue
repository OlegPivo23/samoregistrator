<script setup>
import { ref } from 'vue'
import { QInput, QBtn } from 'quasar'

const formData = ref({
  name: 'Иван Иванов',
  password: '',
  confirmPassword: '',
})

const profileFields = ref([
  { label: 'Имя', model: 'name', type: 'text' },
  { label: 'Новый пароль', model: 'password', type: 'password' },
  { label: 'Подтвердите пароль', model: 'confirmPassword', type: 'password' },
])

const saveProfile = () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    alert('Пароли не совпадают!')
    return
  }

  alert('Данные успешно сохранены!')
  console.log('Сохранённые данные:', formData.value)
}
</script>

<template>
  <form @submit.prevent="saveProfile" class="space-y-4">
    <div v-for="(field, index) in profileFields" :key="index">
      <label :for="field.model" class="block text-sm font-medium text-gray-700">{{
        field.label
      }}</label>
      <q-input
        v-model="formData[field.model]"
        :type="field.type"
        :id="field.model"
        class="mt-1 w-full"
        :label="field.label"
        outlined
      />
    </div>

    <div>
      <q-btn type="submit" label="Сохранить" color="primary" class="w-full" />
    </div>
  </form>
</template>
