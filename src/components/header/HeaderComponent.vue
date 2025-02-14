<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <div class="text-2xl font-bold text-blue-600">
        <a href="#">MyLogo</a>
      </div>
      <nav class="flex space-x-6 items-center">
        <RouterLink to="/cabinet" class="text-gray-700 hover:text-blue-500 transition">
          Личный кабинет
        </RouterLink>
        <RouterLink to="/questions" class="text-gray-700 hover:text-blue-500 transition">
          Опросники
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
