import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage } from 'quasar'

Vue.use(Vuex)

const state = {
  general: {
    GD1: {
      name: '12 hour time format',
      description: 'Enable for 2:00 PM, Disable for 14:00',
      active: false
    }
  },
  view: {
    VW1: {
      name: 'Local time',
      description: 'Always show the time in my local timezone',
      active: true
    },
    VW2: {
      name: 'UTC time',
      description: 'Always show the UTC time',
      active: true
    },
    VW3: {
      name: 'Rain',
      description: 'Feauture to be released',
      active: false
    },
    VW4: {
      name: 'Wind',
      description: 'Feauture to be released',
      active: false
    },
    VW5: {
      name: 'Feels like',
      description: 'Feauture to be released',
      active: false
    }
  },
  graphics: {
    AN1: {
      name: 'Mixed backgrounds',
      description: 'When disabled the background will be kept as the theme',
      active: true
    },
    AN2: {
      name: 'Stop animations',
      description: 'When enabled the background will not animate',
      active: false
    },
    AN3: {
      name: 'Maroon Mode',
      description: 'Disable for Blue Mode',
      active: false
    }
  },
  weatherStorage: {}
}

const mutations = {
  mutateActive (state, payload) {
    if (payload.id.slice(0, 2) === 'GD') {
      Object.assign(state.general[payload.id], payload.updates)
    } else if (payload.id.slice(0, 2) === 'VW') {
      Object.assign(state.view[payload.id], payload.updates)
    } else if (payload.id.slice(0, 2) === 'AN') {
      Object.assign(state.graphics[payload.id], payload.updates)
    }
    // state.settings[payload.id].active = payload.updates.active
  },
  mutateWeather (state, payload) {
    Object.assign(state.weatherStorage, payload.updates)
  },
  loadStorage (state, memory) {
    // Check if states/the app have been updted. If it has don't load from storage.
    if (Object.keys(state.general).length === Object.keys(memory.general).length) {
      Object.assign(state.general, memory.general)
    } if (Object.keys(state.view).length === Object.keys(memory.view).length) {
      Object.assign(state.view, memory.view)
    } if (Object.keys(state.graphics).length === Object.keys(memory.graphics).length) {
      Object.assign(state.graphics, memory.graphics)
    }
    // }
  }
}

const actions = {
  switchActive ({ commit, dispatch }, payload) {
    commit('mutateActive', payload)
    dispatch('saveSettings')
  },
  switchWeather ({ commit }, payload) {
    commit('mutateWeather', payload)
  },
  saveSettings ({ state, dispatch }) {
    LocalStorage.set('settings', state)
  },
  getSettings ({ commit }) {
    const memory = LocalStorage.getItem('settings')
    console.log(memory)
    if (memory) {
      commit('loadStorage', memory)
    }
  }
}

const getters = {
  general: (state) => {
    return state.general
  },
  view: (state) => {
    return state.view
  },
  graphics: (state) => {
    return state.graphics
  },
  getWeather: (state) => {
    if (state.weatherStorage === {}) {
      return undefined
    }
    return state.weatherStorage
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
