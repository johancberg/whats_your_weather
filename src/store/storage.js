import { LocalStorage } from 'quasar';

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
      active: true,
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
  weatherStorage: {},
};

const mutations = {
  mutateActive(state, { id, updates }) {
    if (id.slice(0, 2) === 'GD') {
      Object.assign(state.general[id], updates);
    } else if (id.slice(0, 2) === 'VW') {
      Object.assign(state.view[id], updates);
    } else if (id.slice(0, 2) === 'AN') {
      Object.assign(state.graphics[id], updates);
    }
    //state.settings[id].active = updates.active
  },
  mutateWeather(state, { updates }) {
    Object.assign(state.weatherStorage, updates);
  },
  loadStorage(state, { general, view, graphics }) {
    // Check if states/the app have been updted. If it has don't load from storage.
    if (Object.keys(state.general).length === Object.keys(general).length) {
      Object.assign(state.general, general);
    }
    if (Object.keys(state.view).length === Object.keys(view).length) {
      Object.assign(state.view, view);
    }
    if (Object.keys(state.graphics).length === Object.keys(graphics).length) {
      Object.assign(state.graphics, graphics);
    }
    // }
  },
};

const actions = {
  switchActive({ commit, dispatch }, payload) {
    commit('mutateActive', payload);
    dispatch('saveSettings');
  },
  switchWeather({ commit }, payload) {
    commit('mutateWeather', payload);
  },
  saveSettings({ state }) {
    LocalStorage.set('settings', state);
  },
  getSettings({ commit }) {
    const memory = LocalStorage.getItem('settings');
    if (memory) {
      commit('loadStorage', memory);
    }
  },
};

const getters = {
  general: (state) => state.general,
  view: (state) => state.view,
  graphics: (state) => state.graphics,
  getWeather: (state) => state.weatherStorage,
};

const data = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default data;
