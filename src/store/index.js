import Vue from 'vue'
import Vuex from 'vuex'

import data from './storage'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you cn
 * directly export the Store instantiation
 */

export default function (/* { ssrContext} */) {
  const Store = new Vuex.Store({
    state: {
    },
    mutations: {
    },
    modules: {
      data
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
  return Store
}
