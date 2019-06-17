import Vue from 'vue';
import Vuex from 'vuex';
import users from './users'
import transictions from './transictions'
import favorites from './favorites'
import { EventBus } from '../../../event/Event';
import { axiosApi } from '../axiosAPI.js';
import Utils from '../Utils';

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        visible: false,
        admin:Utils.EMPTY_ADMIN
    },getters:{
        getVisible: (state)=>state.visible,
        getAdmin: (state)=>state.admin
    },actions:{
        loadingEvent:(context, visible)=>context.commit('loadingEvent',visible),
        setAdminId:(context, data)=>context.commit('setAdminId',data),
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
        },
        register:(context,credentials)=>{
            context.commit('loadingEvent',true);
            axiosApi.post('owner',credentials)
            .then( ()=>{ context.dispatch('login', credentials); })
            .catch(()=>context.commit('loadingEvent',false))
            .then(()=>context.commit('loadingEvent',false))
        },
        logout:(context)=>context.commit('logout')
    },
    mutations:{
        loadingEvent:(state,visible)=>state.visible=visible,
        setAdminId:(state,data)=>{
            state.admin.id=data.id
            state.admin.ownerName=data.ownerName
        },
        login:(state,data)=>state.admin=
        data==""?{
            isLoggedIn:true,
            name:"dummy",
            ownerName:"dummy",
            type:"admin",
            id:2
        }:data.type=="admin"?{
            isLoggedIn:true,
            name:data.username,
            type:data.type,
            ownerName:"dummy",
            id:data.id
        }:{
            isLoggedIn:true,
            name:data[0].name,
            type:'user',
            ownerName:"",
            id:0,
            users:data
        },
        logout:state=>state.admin=Utils.EMPTY_ADMIN
    },modules:{users,transictions,favorites}
});