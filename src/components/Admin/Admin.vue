<template>
  <div>
    <div v-if="getAdmin.type=='admin'">
      <b-form-select v-model="id">
        <option v-for="(item,index) in users.users" :key="'names'+index" v-bind:value="item.id">{{item.name}}</option>
      </b-form-select>
      <input type='number' v-model="points" placeholder="Points"> 
      <button class="btn no-icon moreOrLess" :disabled="points==''" v-on:click="points=parseInt(points)*(-1)"> +/- </button>
      <input type='text' v-model="description" placeholder="Description">
      <button class="btn save" :disabled="description=='' || points==''" v-on:click="saveTransition">  </button>
      <button class="btn send" :disabled="id=='' || description=='' || points==''" v-on:click="sendTransition(description,points)">  </button>
      <ul id="favorites">
         <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="(item,index) in favorites.favorites" :key="'favorite'+index">
            <span>{{item.name}} : {{item.points}}</span>
            <button class="btn send" :disabled="id==''" v-on:click="sendTransition(item.name,item.points)">  </button>
            <button class="btn delete" v-on:click="deleteItem(item.id)"> </button>
          </li>
        </transition-group>
      </ul>
    </div>
    <div v-else-if="getAdmin.type=='user'">
      <ul id="users">
         <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="(item,index) in getAdmin.users" :key="'user'+index">
            <span> {{item.ownername}} </span>
            <button class="btn send" v-on:click="setAdminId({id:item.id,ownerName:item.ownername})">  </button>
          </li>
        </transition-group>
      </ul>
    </div>
    <div v-else>
      <div>
        <div> Fai il login </div>
        <input type='text' v-model="username" placeholder="Username">
        <input type='password' v-model="password" placeholder="Password">
        <button class="btn send" v-on:click="login({username:username,password:password})"> </button>
      </div>
      <div> oppure </div>
      <div>
        <div> Crea un nuovo Owner </div>
        <input type='text' v-model="usernameRegistration" placeholder="Username">
        <input type='password' v-model="passwordRegistration" placeholder="Password">
        <button class="btn send" v-on:click="register({username:usernameRegistration,password:passwordRegistration})"> </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions,mapState } from 'vuex';
import { EventBus } from '../../event/Event';

export default {
  name: 'Admin',
  data(){
    return {
      username:'',
      password:'',
      usernameRegistration:'',
      passwordRegistration:'',
      description:'',
      points:'',
      id:''
    }
  },
  computed:{
    ...mapState(['users','favorites']),
    ...mapGetters(['getAdmin'])
  },
  mounted(){
    this.$store.dispatch('getUsers');
    this.$store.dispatch('getFavorites');
  },
  methods:{
    ...mapActions(['login','addTransiction','addFavorite','register','setAdminId']),
    deleteItem(index){this.$store.dispatch('deleteFavorite',index);},
    sendTransition(description,points){
      this.addTransiction({
        user_id:this.id,
        description:description,
        points:points,
        owner_id:this.getAdmin.id
      }).then(()=>{
        EventBus.emit('notify-error-rest',{
          group: 'notifications',
          title: "Transiction Complete",
          type: 'success'
        });
      })
    },
    saveTransition(){
      this.addFavorite({
        name:this.description,
        points:this.points
      })
    }
  }
}
    
</script>

<style src="./Admin.css" scoped> </style>