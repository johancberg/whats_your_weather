import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { ExampleStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const exampleModule: Module<ExampleStateInterface, StateInterface> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default exampleModule;
