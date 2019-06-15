<template>
  <div id="app">
    <notifications group="notifications" position="top left"/>
    <VueLoading :active.sync="visible" :can-cancel="true" :is-full-page="true" loader="dots"/>
    <nav>
      <router-link to="/">Admin</router-link>
      <router-link to="/skills" v-if="getAdmin.isLoggedIn">Classifica</router-link>
      <router-link to="/points" v-if="getAdmin.isLoggedIn">History</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { EventBus } from './event/Event.js';
import { mapGetters} from 'vuex';
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
    ...mapGetters(['getAdmin']),
    visible(){return this.$store.getters.getVisible;}
  }
}
</script>

<style src="./App.css"> </style>