<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      variantClasses,
      sizeClasses,
      $attrs.class,
    ]"
    :disabled="disabled || loading"
  >
    <LoadingSpinner v-if="loading" class="w-4 h-4 mr-2" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";

interface Props {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
});

const variantClasses = computed(() => {
  const classes = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-300",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-gray-300",
  };
  return classes[props.variant];
});

const sizeClasses = computed(() => {
  const classes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  return classes[props.size];
});
</script>
