<script setup>
import ContactForm from 'src/components/forms/ContactForm.vue'
import ProfileForm from 'src/components/forms/ProfileForm.vue'
import TabMenu from 'src/components/tabs/TabMenu.vue'
import MainLayout from 'src/layouts/MainLayout.vue'
import { ref } from 'vue'

const activeTab = ref('profile')
</script>

<template>
  <MainLayout>
    <div class="min-h-screen flex justify-center items-center bg-gray-100">
      <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-700 text-center mb-6">Личный кабинет</h2>
        <TabMenu v-model:activeTab="activeTab" />
        <div v-if="activeTab === 'profile'">
          <ProfileForm />
        </div>
        <div v-if="activeTab === 'contact'">
          <ContactForm />
        </div>
      </div>
    </div>
  </MainLayout>
</template>
