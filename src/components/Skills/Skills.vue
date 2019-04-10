<template>
  <div class="hello">
    <div class="holder">
      <form @submit.prevent="addItem">
        <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
          <p class="alert" v-if="errors.has('skill')">{{ errors.first('skill') }}</p>
        </transition>
        <input type="text" placeholder="Enter a skill you have.." v-model="skill" v-validate="'min:5'" name="skill">
      </form>
      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="(item,index) in users.users" :key='index'> 
            <span v-if="!item.isEditing">{{ index }} . {{item.name}} </span>
            <input type="text" v-else v-model="item.name">
            <button class="btn" v-on:click="deleteItem(item.id)"> Delete </button>
            <button class="btn" v-if="!item.isEditing" v-on:click="editItem(item)"> Rename </button>
            <button class="btn" v-else v-on:click="renameItem(item)"> Update </button>
          </li>
        </transition-group>
      </ul>
      <p v-if="users.users.length>0">These are the users that you possess.</p>
      <p v-else>You don't posses any users. :(</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Skills',
  data(){
    return {
      skill:''
    }
  },
  computed:mapState(['users']),
  mounted(){
    this.$store.dispatch('getUsers');
  },
  methods : {
    deleteItem(index){this.$store.dispatch('deleteUser',index);},
    editItem(item){item.isEditing=true;},
    renameItem(item){this.$store.dispatch('updateUser',item);},
    addItem(){
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('addUser',this.skill);
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
      });
    }
  }
}
</script>

<style src="./Skills.css" scoped> </style>
