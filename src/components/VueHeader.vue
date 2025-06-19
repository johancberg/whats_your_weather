<template>
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
          v-if="checkRoute"
          round
          dense
          flat
          to="/position"
          icon="my_location"
        />
        <q-btn
          v-else
          round
          dense
          flat
          @click="getLocation"
          icon="my_location"
        />
      </template>

      <template v-slot:append>
        <q-btn
          v-if="search"
          @click="getWeatherBySearch"
          round
          dense
          flat
          icon="search"
        />
        <q-btn
          v-if="weatherData"
          to="/settings"
          round
          dense
          flat
          icon="settings"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
    };
  },
  props: {
    weatherData: Object,
    route: String,
  },
  computed: {
    checkRoute() {
      return this.route === 'index';
    },
  },
  methods: {
    getWeatherBySearch() {
      this.$emit('getWeatherBySearch', this.search);
    },
    getLocation() {
      this.$emit('getLocation');
    },
  },
};
</script>
