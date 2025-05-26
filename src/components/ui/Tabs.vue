<template>
  <div class="tabs-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch, toRefs } from "vue";

interface Props {
  modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const { modelValue } = toRefs(props);
const activeTab = ref(modelValue.value);

watch(modelValue, (newValue) => {
  activeTab.value = newValue;
});

watch(activeTab, (newValue) => {
  emit("update:modelValue", newValue);
});

provide("tabs", {
  activeTab,
  setActiveTab: (value: string) => {
    activeTab.value = value;
  },
});
</script>

<script lang="ts">
export const TabsList = {
  template: '<div class="tabs-list"><slot /></div>',
};

export const TabsTrigger = {
  props: ["value"],
  inject: ["tabs"],
  template: `
    <button
      @click="tabs.setActiveTab(value)"
      :class="[
        'tab-trigger',
        tabs.activeTab.value === value ? 'active' : ''
      ]"
    >
      <slot />
    </button>
  `,
};
</script>

<style scoped>
:deep(.tabs-list) {
  display: flex;
  background-color: #f3f4f6;
  padding: 0.25rem;
  border-radius: 0.5rem;
}

:deep(.tab-trigger) {
  flex: 1;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  background-color: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

:deep(.tab-trigger:hover) {
  color: #374151;
}

:deep(.tab-trigger.active) {
  color: #1f2937;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>
