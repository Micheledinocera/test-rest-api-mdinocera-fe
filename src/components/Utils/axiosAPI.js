import Vue from 'vue';
import Utils from './Utils';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { EventBus } from '../../event/Event';

Vue.use(VueAxios, axios);

export const axiosApi = axios.create({baseURL: Utils.BASEURL})

axiosApi.interceptors.response.use( 
    response => response,
    error => { 
        EventBus.emit('notify-error-rest',{
            group: 'notifications',
            title: error.response!=undefined?("CODE:" + error.response.statusText +" - "+error.response.statusText):"ERROR",
            text: error.response!=undefined?error.response.data.message:error.message + " for rest call at url: "+ (error.response!=undefined?error.response.config.url:error.config.url),
            type: 'error'
        });
        return Promise.reject(error); 
});