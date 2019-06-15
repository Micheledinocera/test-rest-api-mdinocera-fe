<template>
  <div>
    <ul>
      <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
        <li v-for="(item,index) in transictions.transictions" v-bind:key="'transaction'+index"> 
          <span>{{item.created_on}} {{item.name}} - {{item.description}} : {{item.points}}</span>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Points',
  computed:{
    ...mapState(['transictions'])
  },
  mounted(){
    this.$store.dispatch('getTransictions');
  }
}
    
</script>

<style src="./Points.css" scoped> </style>