<template>
  <q-page
    class="blue fullscreen text-white text-center q-pa-sm flex flex-center"
  >
    <div>
      <div style="font-size: 20vh">Error 404</div>

      <div class="text-h2" style="opacity: 0.8">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Back"
        no-caps
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Error 404',
};
</script>

<style lang="sass" scoped>
@import '../css/page-theme'

.q-page
  @include page-theme
</style>
