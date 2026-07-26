<template>
  <q-page class="flex column" :class="bgClass">
    <VHeader
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
import useStorage from 'stores/storage'
import VHeader from 'components/VHeader.vue';
export default {
  name: 'WhatsYourWeather',
  data() {
    return {
      weatherData: null,
      route: 'index',
      storage: useStorage()
    };
  },
  components: {
    VHeader,
  },
  computed: {
    bgClass() {
      let className = '';
      if (this.storage.graphics?.AN3?.active) {
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
          console.log(e);
        }
      }
      this.storage.setLang(detectedLang);
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

<style lang="sass" scoped>
@import '../css/page-theme'

.q-page
  @include page-theme
.skyline
  flex: 0 0 80px
  background: url(../statics/skyline.png)
  background-size: contain
  background-position: center bottom
</style>
