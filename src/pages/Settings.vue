<template>
  <q-page class="flex column" :class="bgTheme">
    <div class="q-pb-xl q-px-md">
      <q-input dark borderless> </q-input>
      <div class="col column text-center text-white">
        <div class="col text-h4 text-weight-thin">What's Your Settings</div>
      </div>
    </div>
    <q-list class="q-py-lg q-px-sm settings-content">
      <q-btn to="/position" exact: true label="Back" flat icon="arrow_back"
      name="Back" />
      <q-item-label header>General</q-item-label>

      <setting
        v-for="(setting, id) in general"
        :key="id"
        :setting="setting"
        :id="id"
      >
      </setting>

      <q-item-label header>View</q-item-label>
      <setting
        v-for="(setting, id) in view"
        :key="id"
        :setting="setting"
        :id="id"
      >
      </setting>

      <q-item-label header>Graphics</q-item-label>
      <setting
        v-for="(setting, id) in graphics"
        :key="id"
        :setting="setting"
        :id="id"
      >
      </setting>
    </q-list>
    <div class="skyline settings-content"></div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import * as option from 'components/SettingsMap/Option.vue';

export default {
  name: 'WeatherApp',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('data', ['general', 'view', 'graphics']),
    bgTheme() {
      if (this.graphics?.AN3?.active) {
        return 'maroon';
      } else {
        return 'blue';
      }
    },
  },
  components: {
    setting: option.default,
  },
};
</script>
<style lang="sass">
.q-page
  min-height: 100vh
  display: flex
  flex-direction: column
  &.blue
    background: linear-gradient(to bottom, #2980b9, #2c3e50)
  &.maroon
    background: linear-gradient(to bottom, #b00a0a, #431f11)
.degree
  top: -44px
.skyline
  flex: 0 0 80px
  background: url(../statics/skyline.png)
  background-size: contain
  background-repeat-y: no-repeat
  background-position: center bottom
  margin-top: auto
.settings-content
  background-color: white

@keyframes animation-bg
  0%
    background-position: left
  50%
    background-position: right
  100%
    background-position: left
</style>
