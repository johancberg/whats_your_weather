<template>
  <q-page class="flex column" :class="bgClass">
    <VueHeader
      :weatherData="weatherData"
      :route="route"
      @getLocation="getLocation"
    />

    <div class="col column text-center text-white">
      <div class="col text-h2 text-weight-thin">What's Your<br />Weather</div>
      <q-btn to="/position" class="col" flat="">
        <q-icon left size="3em" name="my_location" />
        <div>Find my location</div>
      </q-btn>
    </div>

    <div class="col skyline"></div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VueHeader from 'components/VueHeader.vue';
export default {
  name: 'WhatsYourWeather',
  data() {
    return {
      weatherData: null,
      route: 'index',
    };
  },
  components: {
    VueHeader,
  },
  computed: {
    ...mapGetters('data', ['general', 'view', 'graphics', 'getWeather', 'lang']),
    ...mapActions('data', ['setLang, switchWeather']),
    bgClass() {
      let className = '';
      if (this.graphics?.AN3?.active) {
        className = 'maroon';
      } else {
        className = 'blue';
      }
      return className;
    },
    getLocation() {
      return 0;
    },
  },
  methods: {
    async detectPreferredLanguage() {
      const lang = navigator.language || navigator.userLanguage;
      const isSwedishLang = lang.startsWith('sv');

      let detectedLang = 'en';
      if (isSwedishLang) {
        detectedLang = 'sv';
      } else {
        try {
          const res = await fetch('https://ipapi.co/json/');
          if (res.ok) {
            const data = await res.json();
            if (data.country === 'SV') {
              detectedLang = 'sv';
            }
          }
        } catch (e) {
          // fallback to 'en'
        }
      }
      this.$store.dispatch('data/setLang', detectedLang);
      return detectedLang;
    }
  },
  mounted() {
    navigator.permissions.query({ name: 'geolocation' }).then((status) => {
      if (status.state === 'granted') {
        this.$router.push('/position');
      }
    });
    this.detectPreferredLanguage();
  },
};
</script>

<style lang="sass">
.q-page
  &.blue
    background: linear-gradient(to bottom, #2980b9, #2c3e50)
  &.maroon
    background: linear-gradient(to bottom, #b00a0a, #431f11)
  &.bg-day
    background: linear-gradient(135deg, #0ed2f7, #00b4db, #0072ff)
    background-size: 300%
    transition: all 1s ease
    &.bg-animation
      animation: 20s ease animation-bg infinite alternate
  &.bg-sunset
    background: linear-gradient(135deg, rgb(247,81,255) 0%, rgb(255,209,24) 65%, rgb(255,159,80)100%)
    background-size: 300%
    transition: all 1s ease
    &.bg-animation
      animation: 20s ease animation-bg infinite alternate
  &.bg-sunrise
    background: linear-gradient(155deg, rgba(82,216,255,1) 0%, rgba(150,254,255,1) 50%, rgba(242,255,105,1) 100%)
    background-size: 300%
    transition: all 1s ease
    &.bg-animation
      animation: 20s ease animation-bg infinite alternate
  &.bg-rain
    background: linear-gradient(135deg, rgba(139,164,168,1) 0%, rgba(50,126,144,1) 65%, rgba(0,131,176,1) 100%)
    background-size: 300%
    transition: all 1s ease
    &.bg-animation
      animation: 20s ease animation-bg infinite alternate
  &.bg-night
    background: linear-gradient(-25deg, #232526, #414345, #2c5364)
    background-size: 300%
    transition: all 1s ease
    &.bg-animation
      animation: 20s ease animation-bg infinite alternate
.degree
  top: -44px
.skyline
  flex: 0 0 80px
  background: url(../statics/skyline.png)
  background-size: contain
  background-position: center bottom
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
