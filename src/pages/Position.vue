<template>
  <q-page class="flex column" :class="bgClass">
    <div class="col q-pt-lg q-px-md">
      <q-input
        v-model="search"
        @keyup.enter="getWeatherBySearch"
        placeholder="Search for a city"
        dark
        borderless
      >
        <template v-slot:before>
          <q-btn
            round
            dense
            flat
            @click="getLocation"
            icon="my_location"
          />
        </template>

        <template v-slot:append>
          <q-btn v-if="search"
          @click="getWeatherBySearch"
          round
          dense
          flat
          icon="search"
        />
          <q-btn v-if="weatherData"
          to="/settings"
          round
          dense
          flat
          icon="settings"
          />
        </template>
      </q-input>
    </div>

    <template v-if="weatherData && cityData">
    <div class="text-white text-center">
      <div class="text-h4 text-weight-light">
        {{ cityData.name }}, {{ cityData.country }}
      </div>
      <div class="text-h6 text-weight-light">
        {{ weatherData.current.weather[0].main }}
      </div>
      <div class="text-h1 text-weight-thin q-my-md relative-position">
      <span>{{ Math.round(weatherData.current.temp) }}</span>
      <span class="text-h4 relative-position degree">&deg;C</span>
      </div>
      <div><span class="text-h5 text-weight-light"> {{ setDestinedTimeFormat(0) }} {{ getTimezone( 0 - (weatherData.timezone_offset / 3600)) }} </span></div>
      <div>
        <template v-if="weatherData.timezone_offset < 0 && viewUTCActive">
          <span class="text-h7 text-weight-light"> {{ setUTCTimeFormat }} GMT {{ weatherData.timezone_offset / 3600}}:00 </span>
        </template>
        <template v-else-if="weatherData.timezone_offset > 0 && viewUTCActive">
          <span class="text-h7 text-weight-light"> {{ setUTCTimeFormat }} GMT +{{ weatherData.timezone_offset / 3600}}:00 </span>
        </template>
        <div v-if="(new Date().getTimezoneOffset() / 60) != (0 - (weatherData.timezone_offset / 3600)) && time && viewLocalActive">
          <span class="text-h7 text-weight-light"> {{ setTimeFormat }} {{ getTimezone(new Date().getTimezoneOffset() / 60) }} </span>
        </div>
      </div>
    </div>

    <div class="text-center">
      <img :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon }@2x.png`">
    </div>

    <div class="col text-center hour-content">
      <div v-for="i in 12" :key="i" class="hour-outer">
        <div class="text-white text-weight-light hour-inner">
        <span class="text-weight-bold">{{ Math.round(weatherData.hourly[i].temp) }} &deg;C</span>
        <span>{{ setDestinedTimeFormat(i) }}</span>
        </div>
      </div>
    </div>
    </template>
    <div class="col skyline"></div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { mapActions, mapGetters } from 'vuex'
import { returnApiKey } from './ApiKey'
export default {
  name: 'WeatherApp',
  data () {
    return {
      search: '',
      weatherData: this.exeWeather(),
      cityData: null,
      lat: null,
      lon: null,
      time: null,
      apiUrl: 'https://api.openweathermap.org/data/2.5/onecall',
      cityUrl: 'https://api.openweathermap.org/geo/1.0/reverse',
      apiKey: returnApiKey
    }
  },
  // beforeCreate () {
  //  this.weatherData = exeWeather()
  // },
  computed: {
    ...mapGetters('data', ['general', 'view', 'graphics', 'getWeather']),
    bgClass () {
      let className = ''
      if (this.weatherData && this.graphics.AN1.active) {
        const timezone = this.weatherData.timezone_offset / 3600
        const sunsetTime = new Date(this.weatherData.current.sunset * 1000)
        const sunriseTime = new Date(this.weatherData.current.sunrise * 1000)
        const currentTime = new Date()
        const currentHour = ((currentTime.getUTCHours() + timezone) % 24 + 24) % 24
        const sunsetHour = ((sunsetTime.getUTCHours() + timezone) % 24 + 24) % 24
        const sunriseHour = ((sunriseTime.getUTCHours() + timezone) % 24 + 24) % 24
        if (Math.abs(sunsetHour - currentHour) <= 1) {
          className += 'bg-sunset'
        } else if (Math.abs(sunriseHour - currentHour) <= 1) {
          className += 'bg-sunrise'
        } else if (this.weatherData.current.weather[0].icon.endsWith('n')) {
          className += 'bg-night'
        } else if (this.weatherData.current.weather[0].main === 'Rain') {
          className += 'bg-rain'
        } else {
          className += 'bg-day'
        }
        if (!this.graphics.AN2.active) {
          className += ' bg-animation'
        }
        return className
      } else if (this.graphics.AN3.active) {
        className = 'maroon'
      } else {
        className = 'blue'
      }
      return className
    },
    setTimeFormat () {
      const timeStamp = Date.now()
      if (this.general.GD1.active) {
        return date.formatDate(timeStamp, 'hh:00 A')
      } else {
        return date.formatDate(timeStamp, 'HH:00')
      }
    },
    setUTCTimeFormat () {
      const str = this.setTimeFormat.toString()
      let str1 = str.slice(0, 2)
      const str2 = str.slice(2)
      if (this.general.GD1.active) {
        str1 = ((parseInt(str1) + new Date().getTimezoneOffset() / 60) + 12) % 12
      } else {
        str1 = ((parseInt(str1) + new Date().getTimezoneOffset() / 60) + 24) % 24
      }
      if (str1.toString().length > 1) {
        return (str1.toString() + str2)
      } else {
        return ('0' + str1.toString() + str2)
      }
    },
    getAMPM () {
      if (this.general.GD1.active) {
        if (((this.setDestinedTimeFormat(0) + this.weatherData.timezone / 3600) % 24) < 12) {
          return 'AM'
        } else {
          return 'PM'
        }
      }
      return ''
    },
    viewLocalActive () {
      return this.view.VW1.active
    },
    viewUTCActive () {
      return this.view.VW2.active
    }
  },
  methods: {
    ...mapActions('data', ['switchWeather']),
    setDestinedTimeFormat (hour) {
      const str = this.setUTCTimeFormat
      let str1 = (parseInt(str.slice(0, 2)))
      const str2 = str.slice(2)
      if (this.general.GD1.active) {
        str1 = (str1 + hour + (this.weatherData.timezone_offset / 3600)) % 12
      } else {
        str1 = (str1 + hour + (this.weatherData.timezone_offset / 3600)) % 24
      }
      if (str1.toString().length > 1) {
        return (str1.toString() + str2)
      } else {
        return ('0' + str1.toString() + str2)
      }
    },
    getTimezone (localTimezone) {
      const isDST = this.getDST() ? 1 : 0
      const timezone = localTimezone + isDST
      if (timezone === 10) {
        return 'HST'
      } else if (timezone === 9) {
        return 'AKST'
      } else if (timezone === 8) {
        return 'PST'
      } else if (timezone === 7) {
        return 'PDT'
      } else if (timezone === 6) {
        return 'CST'
      } else if (timezone === 5) {
        return 'EST'
      } else if (timezone === 4) {
        return 'EDT'
      } else if (timezone === 3) {
        return 'ADT'
      } else if (timezone === 2) {
        return 'AT'
      } else if (timezone === 1) {
        return 'WAT'
      } else if (timezone === 0) {
        if (isDST) { return 'BST' } else { return 'GMT' }
      } else if (timezone === -1) {
        if (isDST) { return 'CEST' } else { return 'CET' }
      } else if (timezone === -2) {
        if (isDST) { return 'EEST' } else { return 'EET' }
      } else if (timezone === -3) {
        return 'MSK'
      } else if (timezone === -5) {
        return 'PKT'
      } else if (timezone === -6) {
        return 'OMSK'
      } else if (timezone === -7) {
        return 'KRAT'
      } else if (timezone === -8) {
        return 'CST'
      } else if (timezone === -9) {
        return 'AWST'
      } else if (timezone === -9.5) {
        return 'ACST'
      } else if (timezone === -10) {
        return 'AEST'
      } else if (timezone === -12) {
        return 'NZST'
      } else {
        return ''
      }
    },
    exeWeather () {
      // if (this.getWeather === undefined) {
      this.getLocation()
      // } else {
      //  this.weatherData = this.getWeather
      // }
    },
    stdTimeZoneOffset () {
      const fullYear = new Date().getFullYear()
      const jan = new Date(fullYear, 0, 1)
      const jul = new Date(fullYear, 6, 1)
      return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
    },
    getDST () {
      return new Date().getTimezoneOffset() < this.stdTimeZoneOffset()
    },
    getLocation () {
      this.$q.loading.show()
      this.cond = this.$q.platform.is.electron
      if (this.cond === true || this.cond !== undefined) {
        this.$axios('https://freegeoip.app/json/').then(response => {
          this.lat = response.data.latitude
          this.lon = response.data.longitude
          this.time = this.calculateTimezones(response.timestamp)
          this.getWeatherByCoords()
        })
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude
          this.lon = position.coords.longitude
          this.time = this.calculateTimezones(position.timestamp)
          this.getWeatherByCoords()
        })
      }
    },
    getCityData () {
      this.$axios(`${this.cityUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`).then(response => {
        console.log(response.data[0])
        this.cityData = response.data[0]
      }).catch(error => {
        this.$q.dialog({ title: 'Error', message: 'The inserted location could not be found: ' + error })
      })
    },
    getWeatherByCoords () {
      this.$q.loading.show()
      this.$axios(`${this.apiUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`).then(response => {
        console.log(response)
        this.weatherData = response.data
        this.getCityData()
        this.switchWeather({ updates: { weatherStorage: this.weatherData } })
      }).catch(error => {
        this.$q.dialog({ title: 'Error', message: 'Something unexpected happened: ' + error })
      })
      this.$q.loading.hide()
    },
    getWeatherBySearch () {
      this.$q.loading.show()
      this.$axios(`https://api.openweathermap.org/geo/1.0/direct?q=${this.search}&appid=${this.apiKey}&units=metric`).then(response => {
        this.lat = response.data[0].lat
        this.lon = response.data[0].lon
        this.getWeatherByCoords()
        this.switchWeather({ updates: { weatherStorage: this.weatherData } })
      }).catch(error => {
        this.$q.dialog({ title: 'Error', message: 'The inserted location could not be found: ' + error })
      })
      this.$q.loading.hide()
    },
    calculateTimezones (timestamp) {
      const date = new Date(timestamp * 1000 / 1000)
      const timestr = date.toLocaleTimeString()
      const timearray = timestr.split(':')
      return timearray[0]
    }
  }
}
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
      transition: 1s ease
      &.bg-animation
        animation: 20s ease animation-bg infinite alternate
    &.bg-sunset
      background: linear-gradient(135deg, rgb(247,81,255) 0%, rgb(255,209,24) 65%, rgb(255,159,80)100%)
      background-size: 300%
      transition: 1s ease
      &.bg-animation
        animation: 20s ease animation-bg infinite alternate
    &.bg-sunrise
      background: linear-gradient(155deg, rgba(82,216,255,1) 0%, rgba(150,254,255,1) 50%, rgba(242,255,105,1) 100%)
      background-size: 300%
      transition: 1s ease
      &.bg-animation
        animation: 20s ease animation-bg infinite alternate
    &.bg-rain
      background: linear-gradient(135deg, rgba(139,164,168,1) 0%, rgba(50,126,144,1) 65%, rgba(0,131,176,1) 100%)
      background-size: 300%
      transition: 1s ease
      &.bg-animation
        animation: 20s ease animation-bg infinite alternate
    &.bg-night
      background: linear-gradient(-25deg, #232526, #414345, #2c5364)
      background-size: 300%
      transition: 1s ease
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
  .hour-content
    display: flex
    justify-content: space-evenly
  .hour-outer
    display: flex
    flex-direction: row
  .hour-inner
    display: flex
    flex-direction: column
    justify-content: space-evenly

  @keyframes animation-bg
    0%
      background-position: left
    50%
      background-position: right
    100%
      background-position: left
</style>
