<script setup lang="ts">
import FooterComponent from 'src/components/footer/FooterComponent.vue'
import HeaderComponent from 'src/components/header/HeaderComponent.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen max-w-[1440px] w-full mx-auto ">
    <header class="flex-shrink-0">
      <HeaderComponent />
    </header>
    <main class="flex-grow">
      <slot />
    </main>
    <footer class="flex-shrink-0">
      <FooterComponent />
    </footer>
  </div>
</template>
