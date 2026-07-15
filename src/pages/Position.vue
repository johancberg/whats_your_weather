<template>
  <q-page v-if="page.twentyfourHours" class="flex column" :class="bgClass">
    <Header
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
                {{ getTimezone(0 - weatherData.timezone_offset / 3600, weatherData.timezone) }}
              </span>
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
    <Header
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
    <Header
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
            {{ setDestinedTimeFormat(0, true) }}
            {{
              getTimezone(0 - weatherData.timezone_offset / 3600, weatherData.timezone)
            }}
          </span>
        </div>
        <div>
          <template v-if="weatherData.timezone_offset < 0 && viewUTCActive">
            <span class="text-h7 text-weight-light">
              {{ setUTCTimeFormatWithMinutes }} GMT
              {{ weatherData.timezone_offset / 3600 }}:00
            </span>
          </template>
          <template
            v-else-if="weatherData.timezone_offset > 0 && viewUTCActive"
          >
            <span class="text-h7 text-weight-light">
              {{ setUTCTimeFormatWithMinutes }} GMT +{{
                weatherData.timezone_offset / 3600
              }}:00
            </span>
          </template>
          <div
            v-if="
              this.date.getTimezoneOffset() / 60 !=
                0 - weatherData.timezone_offset / 3600 &&
              time &&
              viewLocalActive
            "
          >
            <span class="text-h7 text-weight-light">
              {{ setTimeFormat }}
              {{ getTimezone(this.date.getTimezoneOffset() / 60) }}
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
import Header from 'components/Header.vue';
import { date } from 'quasar';
import { mapActions, mapGetters } from 'vuex';

const TIMEZONE_NAMES = {
  10: 'HST',
  9: 'AKST',
  8: 'PST',
  7: 'PDT',
  6: 'CST',
  5: 'EST',
  4: 'EDT',
  3: 'ADT',
  2: 'FNT',
  1: 'WAT',
  '-3': 'MSK',
  '-5': 'PKT',
  '-6': 'OMST',
  '-7': 'KRAT',
  '-8': 'CST',
  '-9': 'JST',
  '-9.5': 'ACST',
  '-10': 'AEST',
};

const DST_TIMEZONE_NAMES = {
  0: ['GMT', 'BST'],
  '-1': ['CET', 'CEST'],
  '-2': ['EET', 'EEST'],
  '-12': ['NZST', 'NZDT'],
};

export default {
  name: 'WhatsYourWeather',
  data() {
    return {
      page: { twentyfourHours: false, sevenDays: false },
      date: new Date(),
      timestamp: Date.now(),
      weatherData: this.exeWeather(),
      cityData: null,
      lat: null,
      lon: null,
      time: null,
      apiUrl: 'https://api.openweathermap.org/data/3.0/onecall',
      cityUrl: 'https://api.openweathermap.org/geo/1.0/reverse',
      apiKey: process.env.OPENWEATHERMAP_API_KEY,
      visibleBar: true,
      thumbStyle: {
        marginRight: '3px',
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
    Header,
  },
  computed: {
    ...mapGetters('data', ['general', 'view', 'graphics', 'getWeather']),
    bgClass() {
      let className = '';
      if (this.weatherData && this.graphics?.AN1?.active) {
        const currentWeather = this.weatherData.current
        const timezone = this.weatherData.timezone_offset / 3600;
        const sunsetTime = new Date(currentWeather.sunset * 1000);
        const sunriseTime = new Date(currentWeather.sunrise * 1000);
        const currentTime = this.date;
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
        } else if (currentWeather.weather[0].icon.endsWith('n')) {
          className += 'bg-night';
        } else if (currentWeather.weather[0].main === 'Rain') {
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
      if (this.general?.GD1?.active) {
        return date.formatDate(this.timestamp, 'hh:mm A');
      } else {
        return date.formatDate(this.timestamp, 'HH:mm');
      }
    },
    utcHour24() {
      const hour = this.date.getHours();
      return (hour + this.date.getTimezoneOffset() / 60 + 24) % 24;
    },
    setUTCTimeFormat() {
      const hour = this.general?.GD1?.active
        ? this.utcHour24 % 12
        : this.utcHour24;
      return `${hour.toString().padStart(2, '0')}:00`;
    },
    setUTCTimeFormatWithMinutes() {
      const hour = this.general?.GD1?.active
        ? this.utcHour24 % 12
        : this.utcHour24;
      const minutes = this.date.getMinutes();
      return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    },
    getUTCTimeFormat() {
      return `${this.utcHour24.toString().padStart(2, '0')}:00`;
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
    setDestinedTimeFormat(hour, withMinutes = false) {
      const str = withMinutes ? this.setUTCTimeFormatWithMinutes : this.setUTCTimeFormat;
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
    getTimezone(localTimezone, timeZoneName) {
      const isDST = this.getDST(timeZoneName);
      const timezone = localTimezone + (isDST ? 1 : 0);
      const dstNames = DST_TIMEZONE_NAMES[timezone];
      if (dstNames) {
        return dstNames[isDST ? 1 : 0];
      }
      return TIMEZONE_NAMES[timezone] ?? '';
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
      const fullYear = this.date.getFullYear();
      const jan = new Date(fullYear, 0, 1);
      const jul = new Date(fullYear, 6, 1);
      return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    },
    // UTC offset (in minutes, positive east) of an IANA zone at a given instant.
    utcOffsetMinutes(timeZoneName, atDate) {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZoneName,
        timeZoneName: 'shortOffset',
      }).formatToParts(atDate);
      const raw = parts.find((part) => part.type === 'timeZoneName')?.value;
      const match = raw?.match(/GMT([+-])(\d+)(?::(\d+))?/);
      if (!match) {
        return 0;
      }
      const sign = match[1] === '-' ? -1 : 1;
      return sign * (parseInt(match[2], 10) * 60 + parseInt(match[3] ?? 0, 10));
    },
    // Without a timeZoneName, falls back to the browser's own DST status
    // (used for displaying the device's local time zone).
    getDST(timeZoneName) {
      if (!timeZoneName) {
        return this.date.getTimezoneOffset() < this.stdTimeZoneOffset();
      }
      const fullYear = this.date.getFullYear();
      const janOffset = this.utcOffsetMinutes(
        timeZoneName,
        new Date(fullYear, 0, 1)
      );
      const julOffset = this.utcOffsetMinutes(
        timeZoneName,
        new Date(fullYear, 6, 1)
      );
      const standardOffset = Math.min(janOffset, julOffset);
      return this.utcOffsetMinutes(timeZoneName, this.date) > standardOffset;
    },
    getLocation() {
      this.$q.loading?.show();
      this.cond = undefined; //this.$q.platform.is.electron
      // TODO: The condition below will always be false becuase this.cond is set to undefined above.
      // You may want to adjust the logic based on your requirements.
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
              if (error.code === 2) {
                this.$q.dialog({
                  title: 'Error',
                  message: 'Position update is unavailable. Try to search your location for now.',
                });
              } else if (error.code === 3) {
                this.$q.dialog({
                  title: 'Error',
                  message: 'Timeout. The location could not be received in time. Try to search your location for now.',
                });
              } else {
                this.$q.dialog({
                  title: 'Error',
                  message: 'There occured an error getting the location. Try to search your location for now.',
                });
              }
              this.$q.loading?.hide();
              console.error('Geolocation not available:', error);
            }
          );
        }
      }
    },
    getFullDateName(timeToAdd) {
      return date.formatDate(this.timestamp + 86400000 * timeToAdd, 'dddd');
    },
    getDateName(timeToAdd) {
      return date.formatDate(this.timestamp + 86400000 * timeToAdd, 'ddd');
    },
    getDateFormat(timeToAdd) {
      return date.formatDate(this.timestamp + 86400000 * timeToAdd, 'D MMM');
    },
    getCityData() {
      this.$axios(
        `${this.cityUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`
      )
        .then((response) => {
          this.cityData = response.data[0];
          if (response.data[0]?.alerts) {
            renderAlert();
          }
        })
        .catch((error) => {
          this.$q.dialog({
            title: 'Error',
            message: 'The inserted location could not be found.',
          });
          console.error('Error getting city data:', error);
          this.$q.loading?.hide();
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
            message: 'Something unexpected happened.',
          });
          console.error('Something unexpected happened: ', error);
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
            message: 'The inserted location could not be found.',
          });
          console.error('Error getting inserted location: ', error);
        });
      this.$q.loading?.hide();
    },
    calculateTimezones(timestamp) {
      const date = new Date((timestamp * 1000) / 1000);
      const timestr = date.toLocaleTimeString();
      const timearray = timestr.split(':');
      return timearray[0];
    },
    renderAlert() {
      for (const alert of this.weatherData.alerts) {
        this.$q.dialog({
          title: alert.event,
          message: alert.description,
        })
        .catch((error) => {
          console.error('Error fetching alert details:', error);
        });
      }
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.date = new Date();
      this.timestamp = Date.now();
    }, 1000 * 60);
  },
  beforeUnmount() {
    clearInterval(this.timer);
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
