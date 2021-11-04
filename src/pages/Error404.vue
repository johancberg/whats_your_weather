<template>
  <q-page class="blue fullscreen text-white text-center q-pa-sm flex flex-center">
    <div>
      <div style="font-size: 20vh">
        Error 404
      </div>

      <div class="text-h2" style="opacity:.8">
        Oops. Nothing here...
      </div>

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

<script >
export default {
  name: 'Error404'
}
</script>

<style lang="sass">
  .q-page
    &.blue
      background: linear-gradient(to bottom, #2980b9, #2c3e50)
    &.maroon
      background: linear-gradient(to bottom, #b00a0a, #431f11)
      &.bg-animation
        animation: 20s ease animation-bg infinite alternate

  @keyframes animation-bg
    0%
      background-position: left
    50%
      background-position: right
    100%
      background-position: left
</style>
