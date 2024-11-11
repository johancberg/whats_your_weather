import { createStore } from 'vuex';
import data from './storage';

export default createStore({
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
});
