<template>
  <form @submit.prevent="saveContactInfo" class="space-y-4">
    <div v-for="(field, index) in contactFields" :key="index">
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

<script setup>
import { ref } from 'vue'
import { QInput, QBtn } from 'quasar'
const formData = ref({
  email: '',
  phone: '',
})
const contactFields = ref([
  { label: 'Email', model: 'email', type: 'email' },
  { label: 'Телефон', model: 'phone', type: 'text' },
])
const saveContactInfo = () => {
  alert('Контактные данные успешно сохранены!')
  console.log('Сохранённые контактные данные:', formData.value)
}
</script>
