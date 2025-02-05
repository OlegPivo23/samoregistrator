<script setup>
import { ref, defineAsyncComponent } from 'vue'
import TabMenu from 'src/components/tabs/TabMenu.vue'
import MainLayout from 'src/layouts/MainLayout.vue'
import { QSpinnerDots } from 'quasar'


const activeTab = ref('profile')

const ProfileForm = defineAsyncComponent({
  loader: () => import('src/components/forms/ProfileForm.vue'),
  loadingComponent: () => '<div>Loading profile...</div>',
  delay: 200,
})

const ContactForm = defineAsyncComponent({
  loader: () => import('src/components/forms/ContactForm.vue'),
  loadingComponent: () => '<div>Loading contacts...</div>',
  delay: 200,
})
</script>

<template>
  <MainLayout>
    <div class="min-h-screen flex justify-center items-center bg-gray-100">
      <Suspense>
        <template #default>
          <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-gray-700 text-center mb-6">Личный кабинет</h2>
            <TabMenu v-model:activeTab="activeTab" />

            <KeepAlive>
              <component :is="activeTab === 'profile' ? ProfileForm : ContactForm" />
            </KeepAlive>
          </div>
        </template>
        <template #fallback>
          <div class="flex flex-center q-pa-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </Suspense>
    </div>
  </MainLayout>
</template>
