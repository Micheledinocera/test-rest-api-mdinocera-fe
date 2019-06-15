<template>
  <div class="hello">
    <div class="holder">
      <form @submit.prevent="addItem">
        <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
          <p class="alert" v-if="errors.has('skill')">{{ errors.first('skill') }}</p>
        </transition>
        <input type="text" placeholder="Enter an user name here..." v-model="skill" v-validate="'min:5'" name="skill">
      </form>
      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="(item,index) in users.users" :key="'users'+index"> 
            <span v-if="!item.isEditing">{{index+1}} . {{item.name}} : {{item.points}}</span>
            <input v-else type="text" v-model="item.name">
            <button class="btn delete" v-on:click="deleteItem(item.id)">  </button>
            <button class="btn edit" v-if="!item.isEditing" v-on:click="editItem(item)">  </button>
            <button class="btn done" v-else v-on:click="renameItem(item)">  </button>
          </li>
        </transition-group>
      </ul>
      <p v-if="!users.users.length>0">Add some users. :(</p>
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
  computed:{
    ...mapState(['users']),
    // orderedUsers: function () { 
    //     return this.users.users.sort( (a,b)=>a.points<=b.points )
    //   }
    },
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
