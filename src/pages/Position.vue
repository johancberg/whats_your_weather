<template>
  <q-page v-if="page.twentyfourHours" class="flex column" :class="bgClass">
    <VueHeader
      :weatherData="weatherData"
      @getWeatherBySearch="getWeatherBySearch($event)"
      @getLocation="getLocation"
    />

    <div class="text-white text-center q-mb-lg">
      <div class="text-h4 text-weight-light">
        {{ cityData.name }}, {{ cityData.country }}
      </div>
    </div>
    <div class="text-center hour-content">
      <q-scroll-area
        :visible="visibleBar"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="max-height: 90%; width: 100%"
      >
        <div v-for="i in 24" :key="i" class="q-py-xs hour-row">
          <div
            v-if="isMidnight(i)"
            class="text-h6 text-weight-light text-white"
          >
            {{ getFullDateName(1) }} {{ getDateFormat(1) }}
          </div>
          <div class="text-white text-weight-light hour-inner">
            <div class="hour-time">
              <img
                class="hour-icon"
                :src="`https://openweathermap.org/img/wn/${weatherData.hourly[i].weather[0].icon}@2x.png`"
              />
              <span class="text-weight-bold"
                >{{ Math.round(weatherData.hourly[i].temp) }} &deg;C</span
              >
              <div class="hour-data">
                <span v-if="viewWindActive">
                  {{ weatherData.hourly[i].wind_speed || 0 }} m/s</span
                >
                <span v-if="viewRainActive && weatherData.hourly[i].rain">
                  {{ weatherData.hourly[i].rain['1h'] || 0 }} mm</span
                >
                <span v-else-if="viewRainActive">0 mm</span>
              </div>
            </div>
            <div class="hour-time">
              <span>{{ setDestinedTimeFormat(i) }} </span>
              <span>
                {{ getTimezone(0 - weatherData.timezone_offset / 3600) }}</span
              >
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
    <div class="col row">
      <q-btn class="col" v-on:click="page.twentyfourHours = false" flat="">
        <div class="sub-menu">
          <q-icon
            class="text-white icon-auto"
            left
            size="3em"
            name="cloud_queue"
          />
          <div class="text-white">To main page</div>
        </div>
      </q-btn>
      <q-btn
        class="col"
        v-on:click="
          page.twentyfourHours = false;
          page.sevenDays = true;
        "
        flat=""
      >
        <div class="sub-menu">
          <q-icon
            class="text-white icon-auto"
            left
            size="3em"
            name="cloud_queue"
          />
          <div class="text-white">7 days</div>
        </div>
      </q-btn>
    </div>

    <div class="col skyline"></div>
  </q-page>

  <q-page v-else-if="page.sevenDays" class="flex column" :class="bgClass">
    <VueHeader
      :weatherData="weatherData"
      @getWeatherBySearch="getWeatherBySearch($event)"
      @getLocation="getLocation"
    />

    <div class="text-white text-center q-mb-lg">
      <div class="text-h4 text-weight-light">
        {{ cityData.name }}, {{ cityData.country }}
      </div>
    </div>
    <div class="text-center hour-content">
      <q-scroll-area
        :visible="visibleBar"
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="max-height: 90%; width: 100%"
      >
        <div class="day-row" v-for="i in 7" :key="i">
          <div class="text-white text-weight-light hour-inner">
            <div class="hour-time">
              <img
                class="hour-icon"
                :src="`https://openweathermap.org/img/wn/${weatherData.daily[i].weather[0].icon}@2x.png`"
              />
              <div class="day-temp">
                <span class="text-weight-bold"
                  >{{ Math.round(weatherData.daily[i].temp.max) }} &deg;C</span
                >
                <span class="text-weight-bold"
                  >{{ Math.round(weatherData.daily[i].temp.min) }} &deg;C</span
                >
              </div>
              <div class="hour-data">
                <span v-if="viewWindActive">
                  {{ weatherData.daily[i].wind_speed || 0 }} m/s</span
                >
                <span v-if="viewRainActive && weatherData.daily[i].rain">
                  {{ weatherData.daily[i].rain || 0 }} mm</span
                >
                <span v-else-if="viewRainActive">0 mm</span>
              </div>
            </div>
            <div class="hour-time">
              <span>{{ getDateName(i) }}</span>
              <span>{{ getDateFormat(i) }}</span>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
    <div class="col row">
      <q-btn
        class="col"
        v-on:click="
          page.sevenDays = false;
          page.twentyfourHours = true;
        "
        flat=""
      >
        <div class="sub-menu">
          <q-icon
            class="text-white icon-auto"
            left
            size="3em"
            name="cloud_queue"
          />
          <div class="text-white">24 hours</div>
        </div>
      </q-btn>
      <q-btn class="col" v-on:click="page.sevenDays = false" flat="">
        <div class="sub-menu">
          <q-icon
            class="text-white icon-auto"
            left
            size="3em"
            name="cloud_queue"
          />
          <div class="text-white">To main page</div>
        </div>
      </q-btn>
    </div>

    <div class="col skyline"></div>
  </q-page>

  <q-page v-else class="flex column" :class="bgClass">
    <VueHeader
      :weatherData="weatherData"
      @getWeatherBySearch="getWeatherBySearch($event)"
      @getLocation="getLocation"
    />

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
        <div>
          <span class="text-h5 text-weight-light">
            {{ setDestinedTimeFormat(0) }}
            {{ getTimezone(0 - weatherData.timezone_offset / 3600) }}
          </span>
        </div>
        <div>
          <template v-if="weatherData.timezone_offset < 0 && viewUTCActive">
            <span class="text-h7 text-weight-light">
              {{ setUTCTimeFormat }} GMT
              {{ weatherData.timezone_offset / 3600 }}:00
            </span>
          </template>
          <template
            v-else-if="weatherData.timezone_offset > 0 && viewUTCActive"
          >
            <span class="text-h7 text-weight-light">
              {{ setUTCTimeFormat }} GMT +{{
                weatherData.timezone_offset / 3600
              }}:00
            </span>
          </template>
          <div
            v-if="
              new Date().getTimezoneOffset() / 60 !=
                0 - weatherData.timezone_offset / 3600 &&
              time &&
              viewLocalActive
            "
          >
            <span class="text-h7 text-weight-light">
              {{ setTimeFormat }}
              {{ getTimezone(new Date().getTimezoneOffset() / 60) }}
            </span>
          </div>
        </div>
      </div>

      <div class="text-center">
        <img
          :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        />
      </div>
      <div v-if="weatherData.current.rain" class="text-center rain-wind">
        <span
          v-if="viewWindActive"
          class="text-h6 text-white text-weight-light"
        >
          {{ weatherData.current.wind_speed || 0 }} m/s</span
        >
        <span
          v-if="viewRainActive"
          class="text-h6 text-white text-weight-light"
        >
          {{ weatherData.current.rain['1h'] || 0 }} mm</span
        >
      </div>
      <div v-else class="text-center rain-wind">
        <span
          v-if="viewWindActive"
          class="text-h6 text-white text-weight-light"
        >
          {{ weatherData.current.wind_speed || 0 }} m/s</span
        >
        <span v-if="viewRainActive" class="text-h6 text-white text-weight-light"
          >0 mm</span
        >
      </div>
      <div class="col row">
        <q-btn class="col" v-on:click="page.twentyfourHours = true" flat="">
          <div class="sub-menu">
            <q-icon
              class="text-white icon-auto"
              left
              size="3em"
              name="cloud_queue"
            />
            <div class="text-white">24 hours</div>
          </div>
        </q-btn>
        <q-btn class="col" v-on:click="page.sevenDays = true" flat="">
          <div class="sub-menu">
            <q-icon
              class="text-white icon-auto"
              left
              size="3em"
              name="cloud_queue"
            />
            <div class="text-white">7 days</div>
          </div>
        </q-btn>
      </div>
    </template>
    <div class="col skyline"></div>
  </q-page>
</template>

<script>
import VueHeader from 'components/VueHeader.vue';
import { date } from 'quasar';
import { mapActions, mapGetters } from 'vuex';
import { returnApiKey } from './ApiKey';

export default {
  name: 'WhatsYourWeather',
  data() {
    return {
      page: { twentyfourHours: false, sevenDays: false },
      weatherData: this.exeWeather(),
      cityData: null,
      lat: null,
      lon: null,
      time: null,
      apiUrl: 'https://api.openweathermap.org/data/3.0/onecall',
      cityUrl: 'https://api.openweathermap.org/geo/1.0/reverse',
      apiKey: returnApiKey,
      visibleBar: true,
      thumbStyle: {
        right: '2px',
        borderRadius: '4px',
        backgroundColor: 'rgb(20, 56, 156)',
        width: '5px',
        opacity: 0.75,
      },
      barStyle: {
        right: '2px',
        borderRadius: '4px',
        backgroundColor: 'rgb(20, 56, 156)',
        width: '7px',
        opacity: 0.2,
      },
    };
  },
  components: {
    VueHeader,
  },
  computed: {
    ...mapGetters('data', ['general', 'view', 'graphics', 'getWeather']),
    bgClass() {
      let className = '';
      if (this.weatherData && this.graphics?.AN1?.active) {
        const timezone = this.weatherData.timezone_offset / 3600;
        const sunsetTime = new Date(this.weatherData.current.sunset * 1000);
        const sunriseTime = new Date(this.weatherData.current.sunrise * 1000);
        const currentTime = new Date();
        const currentHour =
          (((currentTime.getUTCHours() + timezone) % 24) + 24) % 24;
        const sunsetHour =
          (((sunsetTime.getUTCHours() + timezone) % 24) + 24) % 24;
        const sunriseHour =
          (((sunriseTime.getUTCHours() + timezone) % 24) + 24) % 24;
        if (Math.abs(sunsetHour - currentHour) <= 1) {
          className += 'bg-sunset';
        } else if (Math.abs(sunriseHour - currentHour) <= 1) {
          className += 'bg-sunrise';
        } else if (this.weatherData.current.weather[0].icon.endsWith('n')) {
          className += 'bg-night';
        } else if (this.weatherData.current.weather[0].main === 'Rain') {
          className += 'bg-rain';
        } else {
          className += 'bg-day';
        }
        if (!this.graphics?.AN2?.active) {
          className += ' bg-animation';
        }
        return className;
      } else if (this.graphics?.AN3?.active) {
        className = 'maroon';
      } else {
        className = 'blue';
      }
      return className;
    },
    setTimeFormat() {
      const timeStamp = Date.now();
      if (this.general?.GD1?.active) {
        return date.formatDate(timeStamp, 'hh:00 A');
      } else {
        return date.formatDate(timeStamp, 'HH:00');
      }
    },
    setUTCTimeFormat() {
      const str = this.setTimeFormat.toString();
      let str1 = str.slice(0, 2);
      const str2 = str.slice(2);
      if (this.general?.GD1?.active) {
        str1 = (parseInt(str1) + new Date().getTimezoneOffset() / 60 + 12) % 12;
      } else {
        str1 = (parseInt(str1) + new Date().getTimezoneOffset() / 60 + 24) % 24;
      }
      if (str1.toString().length > 1) {
        return str1.toString() + str2;
      } else {
        return '0' + str1.toString() + str2;
      }
    },
    getUTCTimeFormat() {
      const str = date.formatDate(Date.now(), 'HH:00');
      let str1 = str.slice(0, 2);
      const str2 = str.slice(2);
      str1 = (parseInt(str1) + new Date().getTimezoneOffset() / 60 + 24) % 24;
      if (str1.toString().length > 1) {
        return str1.toString() + str2;
      } else {
        return '0' + str1.toString() + str2;
      }
    },
    getAMPM() {
      if (this.general?.GD1?.active) {
        if (
          (this.setDestinedTimeFormat(0) +
            this.weatherData.timezone_offset / 3600) %
            24 <
          12
        ) {
          return 'AM';
        } else {
          return 'PM';
        }
      }
      return '';
    },
    viewLocalActive() {
      return this.view?.VW1?.active;
    },
    viewUTCActive() {
      return this.view?.VW2?.active;
    },
    viewRainActive() {
      return this.view?.VW3?.active;
    },
    viewWindActive() {
      return this.view?.VW4?.active;
    },
  },
  methods: {
    ...mapActions('data', ['switchWeather']),
    setDestinedTimeFormat(hour) {
      const str = this.getUTCTimeFormat;
      let str1 = parseInt(str.slice(0, 2));
      let str2 = str.slice(2);
      if (this.general?.GD1?.active) {
        if ((str1 + hour + this.weatherData.timezone_offset / 3600) % 24 < 12) {
          str2 = str2.slice(0, 4) + ' AM';
        } else {
          str2 = str2.slice(0, 4) + ' PM';
        }
        str1 = (str1 + hour + this.weatherData.timezone_offset / 3600) % 12;
        if (str1 === 0) {
          str1 = 12;
        }
      } else {
        str1 = (str1 + hour + this.weatherData.timezone_offset / 3600) % 24;
      }
      if (str1.toString().length > 1) {
        return str1.toString() + str2;
      } else {
        return '0' + str1.toString() + str2;
      }
    },
    getTimezone(localTimezone) {
      const isDST = this.getDST() ? 1 : 0;
      const timezone = localTimezone + isDST;
      if (timezone === 10) {
        return 'HST';
      } else if (timezone === 9) {
        return 'AKST';
      } else if (timezone === 8) {
        return 'PST';
      } else if (timezone === 7) {
        return 'PDT';
      } else if (timezone === 6) {
        return 'CST';
      } else if (timezone === 5) {
        return 'EST';
      } else if (timezone === 4) {
        return 'EDT';
      } else if (timezone === 3) {
        return 'ADT';
      } else if (timezone === 2) {
        return 'AT';
      } else if (timezone === 1) {
        return 'WAT';
      } else if (timezone === 0) {
        if (isDST) {
          return 'BST';
        } else {
          return 'GMT';
        }
      } else if (timezone === -1) {
        if (isDST) {
          return 'CEST';
        } else {
          return 'CET';
        }
      } else if (timezone === -2) {
        if (isDST) {
          return 'EEST';
        } else {
          return 'EET';
        }
      } else if (timezone === -3) {
        return 'MSK';
      } else if (timezone === -5) {
        return 'PKT';
      } else if (timezone === -6) {
        return 'OMSK';
      } else if (timezone === -7) {
        return 'KRAT';
      } else if (timezone === -8) {
        return 'CST';
      } else if (timezone === -9) {
        return 'AWST';
      } else if (timezone === -9.5) {
        return 'ACST';
      } else if (timezone === -10) {
        return 'AEST';
      } else if (timezone === -12) {
        return 'NZST';
      } else {
        return '';
      }
    },
    exeWeather() {
      if (this.getWeather === undefined) {
        this.getLocation();
      } else {
        this.weatherData = this.getWeather;
      }
    },
    isMidnight(hour) {
      const str = this.getUTCTimeFormat;
      const str1 = parseInt(str.slice(0, 2));
      return (str1 + hour + this.weatherData.timezone_offset / 3600) % 24 === 0;
    },
    stdTimeZoneOffset() {
      const fullYear = new Date().getFullYear();
      const jan = new Date(fullYear, 0, 1);
      const jul = new Date(fullYear, 6, 1);
      return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    },
    getDST() {
      return new Date().getTimezoneOffset() < this.stdTimeZoneOffset();
    },
    getLocation() {
      this.$q.loading?.show();
      this.cond = undefined; //this.$q.platform.is.electron
      if (this.cond === true || this.cond !== undefined) {
        this.$axios('https://freegeoip.app/json/').then((response) => {
          this.lat = response.data.latitude;
          this.lon = response.data.longitude;
          this.time = this.calculateTimezones(response.timestamp);
          this.getWeatherByCoords();
        });
      } else {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.lat = position.coords.latitude;
              this.lon = position.coords.longitude;
              this.time = this.calculateTimezones(position.timestamp);
              this.getWeatherByCoords();
            },
            (error) => {
              console.error('Error getting location:', error);
            }
          );
        } else {
          console.error('Geolocation not available');
        }
      }
    },
    getFullDateName(timeToAdd) {
      return date.formatDate(Date.now() + 86400000 * timeToAdd, 'dddd');
    },
    getDateName(timeToAdd) {
      return date.formatDate(Date.now() + 86400000 * timeToAdd, 'ddd');
    },
    getDateFormat(timeToAdd) {
      return date.formatDate(Date.now() + 86400000 * timeToAdd, 'D MMM');
    },
    getCityData() {
      this.$axios(
        `${this.cityUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`
      )
        .then((response) => {
          this.cityData = response.data[0];
        })
        .catch((error) => {
          this.$q.dialog({
            title: 'Error',
            message: 'The inserted location could not be found: ' + error,
          });
        });
    },
    getWeatherByCoords() {
      this.$q.loading?.show();
      this.$axios(
        `${this.apiUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`
      )
        .then((response) => {
          this.weatherData = response.data;
          this.getCityData();
          this.switchWeather({ updates: { weatherStorage: this.weatherData } });
        })
        .catch((error) => {
          this.$q.dialog({
            title: 'Error',
            message: 'Something unexpected happened: ' + error,
          });
        });
      this.$q.loading?.hide();
    },
    getWeatherBySearch(search) {
      this.$q.loading?.show();
      this.$axios(
        `https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${this.apiKey}&units=metric`
      )
        .then((response) => {
          this.lat = response.data[0].lat;
          this.lon = response.data[0].lon;
          this.getWeatherByCoords();
          this.switchWeather({ updates: { weatherStorage: this.weatherData } });
        })
        .catch((error) => {
          this.$q.dialog({
            title: 'Error',
            message: 'The inserted location could not be found: ' + error,
          });
        });
      this.$q.loading?.hide();
    },
    calculateTimezones(timestamp) {
      const date = new Date((timestamp * 1000) / 1000);
      const timestr = date.toLocaleTimeString();
      const timearray = timestr.split(':');
      return timearray[0];
    },
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
    transition: 1s ease
    &.bg-animation
      animation: 20s ease animation-bg infinite alternate
  &.bg-sunset
    background: linear-gradient(135deg, rgb(247,81,255) 0%, rgb(255,209,24) 35%, rgb(255,159,80)100%)
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
    background: linear-gradient(-25deg, #232526, #414345, #263840)
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
.rain-wind span:nth-child(1)
  margin-right: 0
.rain-wind span:nth-child(2)
  margin-left: 2em
.sub-menu
  display: flex
  flex-direction: column
.hour-content
  min-height: 24em
  display: flex
  justify-content: space-evenly
.hour-outer
  display: flex
  flex-direction: row
  justify-content: space-evenly
.hour-inner
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
.day-row, .hour-row
  width: calc(60vw + 6em)
  margin: 0 auto
.day-temp, .hour-data
  display: flex
  flex-direction: column
  align-items: center
.hour-data
  font-size: .8rem
  margin-left: .5em
.hour-time
  display: flex
  flex-direction: row
  align-items: center
.hour-time span
  margin-left: 0.4em
.hour-icon
  width: 4em
  height: 4em
.icon-auto
  margin: 0 auto

@keyframes animation-bg
  0%
    background-position: left
  50%
    background-position: right
  100%
    background-position: left
</style>
