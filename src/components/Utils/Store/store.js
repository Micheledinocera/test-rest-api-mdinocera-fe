import Vue from 'vue';
import Vuex from 'vuex';
import users from './users'
import transictions from './transictions'
import favorites from './favorites'
import { EventBus } from '../../../event/Event';
import { axiosApi } from '../axiosAPI.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        visible: false,
        admin:{
            isLoggedIn:false,
            name:"",
            type:"",
            id:0
        }
    },getters:{
        getVisible: (state)=>state.visible,
        getAdmin: (state)=>state.admin
    },actions:{
        loadingEvent:(context, visible)=>context.commit('loadingEvent',visible),
        login:(context,credentials)=>{
            context.commit('loadingEvent',true);
            axiosApi.post('owner/login',credentials)
            .then((response)=>{
                context.commit('login', response.data);
            })
            .then(()=>{
                EventBus.emit('notify-error-rest',{
                    group: 'notifications',
                    title: "Login Complete",
                    type: 'success'
                });
            })
            .catch(()=>context.commit('loadingEvent',false))
            .then(()=>context.commit('loadingEvent',false))
        }
    },
    mutations:{
        loadingEvent:(state,visible)=>state.visible=visible,
        login:(state,data)=>state.admin=
        data==""?{
            isLoggedIn:true,
            name:"dummy",
            type:"admin",
            id:2
        }:{
            isLoggedIn:true,
            name:data.username,
            type:data.type,
            id:data.id
        }
    },modules:{users,transictions,favorites}
});