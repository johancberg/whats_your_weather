import { LocalStorage } from 'quasar';
import { defineStore } from 'pinia'

const state = {
  general: {
    GD1: {
      name: '12 hour time format',
      description: 'Enable for 2:00 PM, Disable for 14:00',
      active: false,
    },
  },
  view: {
    VW1: {
      name: 'Local time',
      description: 'Always show the time in my local timezone',
      active: true,
    },
    VW2: {
      name: 'UTC time',
      description: 'Always show the UTC time',
      active: false,
    },
    VW3: {
      name: 'Rain',
      description: 'Show the amount of rain in mm',
      active: true,
    },
    VW4: {
      name: 'Wind',
      description: 'Show the wind in meter per second',
      active: true,
    },
    VW5: {
      name: 'Feels like',
      description: 'Feauture to be released',
      active: false,
    },
  },
  graphics: {
    AN1: {
      name: 'Mixed backgrounds',
      description: 'When disabled the background will be kept as the theme',
      active: true,
    },
    AN2: {
      name: 'Stop animations',
      description: 'When enabled the background will not animate',
      active: false,
    },
    AN3: {
      name: 'Maroon Mode',
      description: 'Disable for Blue Mode',
      active: false,
    },
  },
  lang: 'en', // Default language
  weatherStorage: {},
};

const actions = {
  switchActive(payload) {
    this.mutateActive(payload);
    this.saveSettings();
  },
  switchWeather(payload) {
    this.mutateWeather(payload);
    this.saveSettings();
  },
  saveSettings() {
    LocalStorage.set('settings', {
      general: this.general,
      view: this.view,
      graphics: this.graphics,
      lang: this.lang,
      weatherStorage: this.weatherStorage,
    });
  },
  getSettings() {
    const memory = LocalStorage.getItem('settings');
    if (memory) {
      this.loadStorage(memory);
    }
  },
  mutateActive({ id, updates }) {
    if (id.slice(0, 2) === 'GD') {
      Object.assign(this.general[id], updates);
    } else if (id.slice(0, 2) === 'VW') {
      Object.assign(this.view[id], updates);
    } else if (id.slice(0, 2) === 'AN') {
      Object.assign(this.graphics[id], updates);
    }
    //this.settings[id].active = updates.active
  },
  mutateWeather({ updates }) {
    Object.assign(this.weatherStorage, updates);
  },
  loadStorage({ general, view, graphics, lang, weatherStorage }) {
    // Check if states/the app have been updted. If it has don't load from storage.
    if (Object.keys(this.general).length === Object.keys(general).length) {
      Object.assign(this.general, general);
    }
    if (Object.keys(this.view).length === Object.keys(view).length) {
      Object.assign(this.view, view);
    }
    if (Object.keys(this.graphics).length === Object.keys(graphics).length) {
      Object.assign(this.graphics, graphics);
    }
    // TODO: If the stored weather is too old: One might want to erase it.
    //if (weatherStorage && weatherStorage.current.) {
    if (this.weatherStorage != {}) {
      this.weatherStorage = weatherStorage;
    }
    //} else {
    //  this.switchWeather({ updates: {} });
    //}
    if (lang) {
      this.lang = lang;
    }
    // }
  },
  setLang(lang) {
    this.lang = lang;
    this.saveSettings();
  },
};

const getters = {
  getWeather: (state) => state.weatherStorage,
};

const useStorage = defineStore('storage', {
  state: () => state,
  actions,
  getters,
});

export default useStorage;
