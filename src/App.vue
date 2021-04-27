<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('data', ['getSettings'])
  },
  mounted () {
    this.getSettings()
  }
}
</script>
