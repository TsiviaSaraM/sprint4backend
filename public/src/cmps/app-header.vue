<template>
  <!-- <div class="app-header flex" :style="diplayState"> -->
  <div class="app-header flex" :style="headerPos">
    <img v-if="isLarge" class="logo" src="../assets/img/logo.png" alt="" />

    <p v-if="isLarge">Become a host</p>
    <space-filter :style="searchPos" />

    <template v-if="isLarge">
      <button class="flex pointer" @click="toggleNav">
        <img class="hamburger" src="../assets/img/icons/hamburger.png" alt="" />
        <img
          class="avatar"
          src="https://www.cnet.com/a/img/liJ9UZA87zs1viJiuEfVnL7YYfw=/940x0/2020/05/18/5bac8cc1-4bd5-4496-a8c3-66a6cd12d0cb/fb-avatar-2.jpg"
          alt="avatar"
        />
      </button>
      <login v-if="isLoginOpen" @close-login="closeLogin" />
      <ul class="nav pointer clear-list" v-if="isNavOpen">
        <li @click="showLogin">login</li>
        <li @click="showLogin">signup</li>
        <li>Host your home</li>
      </ul>
    </template>

    <div v-if="!isLarge" class="bottom-nav">
      <div class="explore">explore</div>
      <div class="wishlists">wishlists</div>
      <div class="login">login</div>
    </div>
  </div>
</template>

<script>
import spaceFilter from "./space-filter.vue";
import login from "./login.vue";
import { eventBusService } from "./../services/event-bus.service.js";

export default {
  created() {
    console.log("width", this.screenWidth);
    console.log(this.isSmall);

// this.state = true
    // setTimeout(()=>{
      
      eventBusService.$on('headerFixed', (state) =>{
        this.state = state
      });
      eventBusService.$on('searchPos', (isIntersecting) =>{
        this.isIntersecting = isIntersecting
      });
      
    // },3000)
  },
  components: {
    spaceFilter,
    login,
  },
  computed: {
    isLoginOpen() {
      return this.loginOpen;
    },
    loggedInUser() {},
    isNavOpen() {
      return this.navOpen;
    },
    isLarge() {
      return !this.$store.getters.isSmallScreen;
    },
    headerPos(){
          return{
            position:(this.state)? 'fixed' : 'relative',
            background: (this.isIntersecting)? 'none' : 'white',
            'z-index': 10
          }
    },
    searchPos(){
      if(this.state){
        return{
          position: 'relative',
          top:(this.isIntersecting)? '30vh' : 'unset',
          backgroung: (this.isIntersecting)? 'none' : 'white'
        }
      }else{
        return{
          position: 'relative'
        }
      }

    }
  },
  data() {
    return {
      loginOpen: false,
      navOpen: false,
      screenWidth: window.innerWidth,
      // diplayState:{
      //   position:'fixed'
      // }
      state: false,
      isIntersecting:true
    };
  },
  methods: {
    showLogin() {
      this.toggleNav();
      this.loginOpen = true;
    },
    closeLogin() {
      this.loginOpen = false;
    },
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
    
  },
};
</script>

<style>
</style>