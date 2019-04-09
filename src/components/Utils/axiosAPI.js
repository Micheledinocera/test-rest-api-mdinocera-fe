import Utils from './Utils';
import axios from 'axios';
import { EventBus } from '../../event/Event';

export const axiosApi = axios.create({baseURL: Utils.BASEURL})

axiosApi.interceptors.response.use( response => response,
error => { 
    EventBus.emit('loading-event',false);
    EventBus.emit('notify-error-rest',{
        group: 'notifications',
        title: "CODE:" + error.response.status+" - "+error.response.statusText,
        text: error.response.data.message + " for rest call at url: "+ error.response.config.url,
        type: 'error'
    });
    return Promise.reject(error); 
});