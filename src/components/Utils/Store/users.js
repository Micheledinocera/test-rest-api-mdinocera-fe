import { axiosApi } from '../axiosAPI.js';
import Position from '../../../model/Position.js';

export default {
    state : {
        users:[]
    },getters : {
        getUsers: (state)=>state.users
    },mutations : {
        setUsers:(state, users) => state.users = users
    },actions : {
        getUsers: context=>{
            context.commit('loadingEvent',true);
            axiosApi.post('users',{owner_id:context.rootGetters.getAdmin.id})
            .then(response=>{
                var users=[];
                response.data.forEach((item)=>users.push(new Position(item)));
                context.commit('setUsers', users)
            })
            .then(()=>context.commit('loadingEvent',false));
        },
        deleteUser: (context,index)=>{
            context.commit('loadingEvent',true);
            axiosApi.delete('user/'+index)
            .then( () =>{
                context.dispatch('getUsers');
            })
            .then(()=>context.commit('loadingEvent',false));
        },
        updateUser: (context,user)=>{
            context.commit('loadingEvent',true);
            axiosApi.put('user/update',{id:user.id,name:user.name})
            .then(()=>{
                context.dispatch('getUsers');
            })
            .then(()=>context.commit('loadingEvent',false));
        },
        addUser: (context,name)=>{
            context.commit('loadingEvent',true);
            axiosApi.post('user',{id:context.rootGetters.getAdmin.id,name:name})
            .then(()=>{
                context.dispatch('getUsers');
            })
            .then(()=>context.commit('loadingEvent',false));
        }
    }
}