<template>
  <div>
  <div>
    <b-form-select v-model="name">
      <option v-for="(item,index) in users.users" :key="'names'+index" v-bind:value="item.name">{{item.name}}</option>
    </b-form-select>
    <input type='number' v-model="points" placeholder="Points">
    <input type='text' v-model="description" placeholder="Description">
    <button class="btn" v-on:click="sendTransition"> SEND </button>
  </div>
   <ul>
    <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
      <li v-for="(item,index) in transictions.transictions" v-bind:key="'transaction'+index"> 
        <span>{{item.name}} - {{item.description}} : {{item.points}}</span>
      </li>
    </transition-group>
  </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Points',
  data(){
    return {
      description:'',
      points:'',
      name:''
    }
  },
  computed:{
    ...mapState(['transictions','users'])
  },
  mounted(){
    this.$store.dispatch('getUsers');
    this.$store.dispatch('getTransictions');
  },
  methods:{
    sendTransition(){
      this.$store.dispatch('addTransiction',{
        name:this.name,
        description:this.description,
        points:this.points
      });
      this.$store.dispatch('getTransictions');
    }
  }
}
    
</script>

<style src="./Points.css" scoped> </style>