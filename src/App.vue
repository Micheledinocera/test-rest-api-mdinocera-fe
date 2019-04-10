<template>
  <div id="app">
    <notifications group="notifications" position="top left"/>
    <VueLoading :active.sync="visible" :can-cancel="true" :is-full-page="true" loader="dots"/>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { EventBus } from './event/Event.js';
import VueLoading from 'vue-loading-overlay'

export default {
  name: 'app',
  components: {VueLoading},
  data(){
    return {}
  },
  created() {
    EventBus.on('notify-error-rest', this.notifyErrorRestHandler)
  },
  methods:{
    notifyErrorRestHandler(notifyParam){this.$notify(notifyParam);}
  },
  computed:{
    visible(){return this.$store.getters.getVisible;}
  }
}
</script>

<style src="./App.css"> </style>