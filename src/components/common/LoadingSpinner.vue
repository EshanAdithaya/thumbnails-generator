<template>
  <div class="flex flex-col items-center justify-center space-y-3">
    <div class="relative">
      <!-- Outer ring -->
      <div
        class="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"
      ></div>
      <!-- Spinning ring -->
      <div
        class="relative w-12 h-12 rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 animate-spin"
      ></div>
    </div>
    <p v-if="text" class="text-sm text-gray-600 dark:text-gray-400">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text?: string;
}>();
</script>
