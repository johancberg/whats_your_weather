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
        v-for="(setting, id) in storage.general"
        :key="id"
        :setting="setting"
        :id="id"
      >
      </setting>

      <q-item-label header>View</q-item-label>
      <setting
        v-for="(setting, id) in storage.view"
        :key="id"
        :setting="setting"
        :id="id"
      >
      </setting>

      <q-item-label header>Graphics</q-item-label>
      <setting
        v-for="(setting, id) in storage.graphics"
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
import useStorage from 'stores/storage'
import * as option from 'components/SettingsMap/Option.vue';

export default {
  name: 'WhatsYourWeather',
  data() {
    return {
      storage: useStorage()
    };
  },
  computed: {
    bgTheme() {
      if (this.storage.graphics?.AN3?.active) {
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
<style lang="sass" scoped>
@import '../css/page-theme'

.q-page
  min-height: 100vh
  display: flex
  flex-direction: column
  @include page-theme
.skyline
  flex: 0 0 80px
  background: url(../statics/skyline.png)
  background-size: contain
  background-repeat-y: no-repeat
  background-position: center bottom
  margin-top: auto
.settings-content
  background-color: white
</style>
