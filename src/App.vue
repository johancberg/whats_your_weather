<template id="q-app">
  <router-view />
</template>

<script setup lang="ts">
import useStorage from './stores/storage'

defineOptions({
  created() {
    const storage = useStorage()
    storage.getSettings();
  },
});
</script>
