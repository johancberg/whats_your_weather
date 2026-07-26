<template id="q-app">
  <router-view />
</template>

<script setup lang="ts">
import { mapActions } from 'vuex';

defineOptions({
  methods: {
    ...mapActions('data', ['getSettings']),
  },
  created() {
    this.getSettings();
  },
});
</script>
