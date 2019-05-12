import { axiosApi } from '../axiosAPI.js';
import Transiction from '../../../model/Transiction';

export default {
    state : {
        transictions:[]
    },getters : {
        getTransictions: (state)=>state.transictions
    },mutations : {
        setTransictions:(state, transictions) => state.transictions = transictions
    },actions : {
        getTransictions: context=>{
            context.commit('loadingEvent',true);
            axiosApi.get('transitions')
            .then(response=>{
                var transictions=[];
                response.data.forEach(
                    (item)=>transictions.push(new Transiction(item))
                    );
                context.commit('setTransictions', transictions)
            })
            .then(()=>context.commit('loadingEvent',false));
        },
        addTransiction: (context,transiction)=>{
            context.commit('loadingEvent',true);
            axiosApi.post('user/points',transiction)
            .then(response=>{
                var transictions=[];
                response.data.forEach((item)=>transictions.push(new Transiction(item)));
                // context.commit('setTransictions', transictions)
                context.dispatch('getTransictions')
            })
            .then(()=>context.commit('loadingEvent',false));
        }
    }
}