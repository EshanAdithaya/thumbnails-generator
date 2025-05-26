import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  // Global loading state
  const isLoading = ref(false);

  // Recent files for session history
  const recentFiles = ref<
    Array<{
      id: string;
      name: string;
      type: string;
      timestamp: Date;
    }>
  >([]);

  // Global notifications
  const notifications = ref<
    Array<{
      id: string;
      type: "success" | "error" | "info";
      message: string;
      timestamp: Date;
    }>
  >([]);

  function setLoading(loading: boolean) {
    isLoading.value = loading;
  }

  function addRecentFile(file: { name: string; type: string }) {
    recentFiles.value.unshift({
      id: Date.now().toString(),
      ...file,
      timestamp: new Date(),
    });

    // Keep only last 10 files
    if (recentFiles.value.length > 10) {
      recentFiles.value = recentFiles.value.slice(0, 10);
    }
  }

  function addNotification(
    type: "success" | "error" | "info",
    message: string,
  ) {
    const notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
    };

    notifications.value.push(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
  }

  function removeNotification(id: string) {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  }

  function clearRecentFiles() {
    recentFiles.value = [];
  }

  return {
    isLoading,
    recentFiles,
    notifications,
    setLoading,
    addRecentFile,
    addNotification,
    removeNotification,
    clearRecentFiles,
  };
});
