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
        //getUsers: async context=>{
        getUsers: context=>{
            context.commit('loadingEvent',true);
            // let { data } = await axiosApi.get('userss');
            axiosApi.get('users')
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
            .then(response=>{
                var users=[];
                response.data.forEach((item)=>users.push(new Position(item)));
                context.commit('setUsers', users)
            })
            .then(()=>context.commit('loadingEvent',false));
        },
        updateUser: (context,user)=>{
            context.commit('loadingEvent',true);
            axiosApi.put('user/'+user.id,{name:user.name})
            .then(response=>{
                var users=[];
                response.data.forEach((item)=>users.push(new Position(item)));
                context.commit('setUsers', users)
            })
            .then(()=>context.commit('loadingEvent',false));
        },
        addUser: (context,name)=>{
            context.commit('loadingEvent',true);
            axiosApi.post('user',{name:name})
            .then(response=>{
                var users=[];
                response.data.forEach((item)=>users.push(new Position(item)));
                context.commit('setUsers', users)
            })
            .then(()=>context.commit('loadingEvent',false));
        }
    }
}