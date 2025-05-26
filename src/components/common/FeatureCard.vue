<template>
  <button
    @click="$emit('click')"
    :class="[
      'relative group flex flex-col items-center justify-center p-4 lg:p-6 rounded-xl transition-all duration-300',
      active
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105'
        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700',
    ]"
  >
    <!-- Hover effect -->
    <div
      v-if="!active"
      class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/10 group-hover:to-blue-600/10 rounded-xl transition-all duration-300"
    ></div>

    <!-- Icon -->
    <component
      :is="icon"
      :class="[
        'w-8 h-8 lg:w-10 lg:h-10 mb-2 relative z-10 transition-transform duration-300',
        active ? 'transform scale-110' : 'group-hover:scale-110',
      ]"
    />

    <!-- Title -->
    <span
      :class="[
        'text-sm lg:text-base font-medium relative z-10',
        active ? 'text-white' : 'text-gray-700 dark:text-gray-300',
      ]"
    >
      {{ title }}
    </span>

    <!-- Active indicator -->
    <div
      v-if="active"
      class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"
    ></div>
  </button>
</template>

<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  icon: Component;
  title: string;
  active?: boolean;
}>();

defineEmits<{
  click: [];
}>();
</script>
