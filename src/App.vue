<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content with gradient background -->
    <main class="relative z-10 gradient-section min-h-[calc(100vh-4rem)]">
      <router-view />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/common/AppHeader.vue";
import AppFooter from "@/components/common/AppFooter.vue";
</script>
