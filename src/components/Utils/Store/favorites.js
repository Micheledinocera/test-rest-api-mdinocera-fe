import { axiosApi } from '../axiosAPI.js';
import Favorite from '../../../model/Favorite.js';

export default {
    state : {
        favorites:[]
    },getters : {
        getFavorites: (state)=>state.favorites
    },mutations : {
        setFavorites:(state, favorites) => state.favorites = favorites
    },actions : {
        getFavorites: context=>{
            context.commit('loadingEvent',true);
            axiosApi.post('favorites',{id:context.rootGetters.getAdmin.id})
            .then(response=>{
                var favorites=[];
                response.data.forEach((item)=>favorites.push(new Favorite(item)));
                context.commit('setFavorites', favorites)
            })
            .then(()=>context.commit('loadingEvent',false));
        },
        deleteFavorite: (context,index)=>{
            context.commit('loadingEvent',true);
            axiosApi.delete('favorite/'+index)
            .then(response=>{
                var favorites=[];
                response.data.forEach((item)=>favorites.push(new Favorite(item)));
                context.commit('setFavorites', favorites)
            })
            .then(()=>context.commit('loadingEvent',false));
        },
        updateFavorite: (context,favorite)=>{
            context.commit('loadingEvent',true);
            axiosApi.post('favorite/update',{
                id:favorite.id,
                points:favorite.points,
                description:favorite.name
            }).then(response=>{
                var favorites=[];
                response.data.forEach((item)=>favorites.push(new Favorite(item)));
                context.commit('setFavorites', favorites)
            }).then(()=>context.commit('loadingEvent',false));
        },
        addFavorite: (context,favorite)=>{
            context.commit('loadingEvent',true);
            axiosApi.post('favorite',{
                points:favorite.points,
                description:favorite.name,
                id:context.rootGetters.getAdmin.id
            }).then(response=>{
                var favorites=[];
                response.data.forEach((item)=>favorites.push(new Favorite(item)));
                context.commit('setFavorites', favorites)
            })
            .then(()=>context.commit('loadingEvent',false));
        }
    }
}