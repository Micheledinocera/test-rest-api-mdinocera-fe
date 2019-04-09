<template>
  <div class="hello">
    <div class="holder">
      <form @submit.prevent="addSkill">
        <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
          <p class="alert" v-if="errors.has('skill')">{{ errors.first('skill') }}</p>
        </transition>
        <input type="text" placeholder="Enter a skill you have.." v-model="skill" v-validate="'min:5'" name="skill">
      </form>
      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="(item,index) in skills" :key='index'> 
            <span v-if="!item.isEditing">{{ index }} . {{item.name}} </span>
            <input type="text" v-else v-model="item.name">
            <button class="btn" v-on:click="deleteItem(item.id)"> Delete </button>
            <button class="btn" v-if="!item.isEditing" v-on:click="editItem(item)"> Rename </button>
            <button class="btn" v-else v-on:click="renameItem(item)"> Update </button>
          </li>
        </transition-group>
      </ul>
      <p v-if="this.skills.length>0">These are the skills that you possess.</p>
      <p v-else>You don't posses any skills. :(</p>
    </div>
  </div>
</template>

<script>
import Utils from '../Utils/Utils.js';
import Position from '../../model/Position.js';
import { EventBus } from '../../event/Event.js';
import {axiosApi} from '../Utils/axiosAPI.js';

export default {
  name: 'Skills',
  data(){
    return {
      skill:'',
      skills:[
      ]
    }
  },
  mounted : function (){
    EventBus.emit('loading-event',true);
    axiosApi.get('users')
      .then(response => {
        this.skill = '';
        this.skills=[];
        response.data.forEach((item)=>this.skills.push(new Position(item)));
        EventBus.emit('loading-event',false)
      })
  },
  methods : {
    deleteItem(index){ 
      EventBus.emit('loading-event',true);
      axiosApi.delete('user/'+index)
      .then( () => {
        axiosApi.get('users')
        .then(response => {
          this.skills=[];
          response.data.forEach((item)=>this.skills.push(new Position(item)));
          EventBus.emit('loading-event',false)
        })
      });
    },
    editItem(item){
      item.isEditing=true;
    },
    renameItem(item){ 
      EventBus.emit('loading-event',true);
      axiosApi.put('user/'+item.id,{name:item.name})
      .then( () => {
        axiosApi.get('users')
        .then(response => {
          this.skills=[];
          response.data.forEach((item)=>this.skills.push(new Position(item)));
          EventBus.emit('loading-event',false);
        })
      });
      item.isEditing=false;
    },
    addSkill(){
      this.$validator.validateAll().then((result) => {
        if (result) {
          EventBus.emit('loading-event',true);
          axiosApi.post('user',{name:this.skill})
          .then( () => {
            axiosApi.get('users')
            .then(response => {
              this.skill = '';
              this.skills=[];
              response.data.forEach((item)=>this.skills.push(new Position(item)));
              EventBus.emit('loading-event',false)
            })
          });
        } else {
          this.$notify({
            group: 'notifications',
            title: 'Warning',
            text: 'Not valid input',
            // type: 'error'
            // type: 'success'
            type: 'warn'
          });
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Skills.css" scoped> </style>
