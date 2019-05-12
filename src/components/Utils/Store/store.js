import Vue from 'vue';
import Vuex from 'vuex';
import users from './users'
import transictions from './transictions'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        visible: false
    },getters:{
        getVisible: (state)=>state.visible
    },actions:{
        loadingEvent:(context, visible)=>context.commit('loadingEvent',visible)
    },
    mutations:{
        loadingEvent:(state,visible)=>state.visible=visible
    },modules:{users,transictions}
});