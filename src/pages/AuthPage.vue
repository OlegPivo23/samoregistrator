<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { QSpinnerDots } from 'quasar'

const FormComponent = defineAsyncComponent(() => import('src/components/forms/FormComponent.vue'))
</script>

<template>
  <div>
    <Suspense>
      <template #default>
        <FormComponent />
      </template>
      <template #fallback>
        <div class="flex flex-center q-pa-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </Suspense>
  </div>
</template>
