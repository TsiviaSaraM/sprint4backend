<template>
  <div class="home">
<img  class="top-bg" src="https://res.cloudinary.com/dymtestxz/image/upload/v1626437274/sprint4/homePage/57b9f708-bb12-498c-bc33-769f8fc43e63_gnsppx.webp" alt="">
  <button @click="gotoSpaces({field:'count',value: Infinity})">I'm flexible</button>
  <space-list :spaces="spaces"/>
  
  </div>
</template>

<script>
import spaceList from './../cmps/space-app/space-list.vue'
import {eventBusService} from './../services/event-bus.service.js'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    spaceList,
},
created(){
  this.$store.commit({type: 'setFilterField', field:'count', value:4})
  this.$store.dispatch({type: 'loadSpaces'})
  console.log('spaces in home', this.$store.getters.spaces);
  eventBusService.$emit('headerFixed',true )
  // eventbus.$emit('headerFixed', true)


setTimeout(()=>{

  // const sectionOne = document.querySelector(".app-header")
  const sectionOne = document.querySelector(".top-bg")
const options={
  // root:null,
  threshold:1,
  rootMargin : "0px"
}

const observer = new IntersectionObserver(function 
(entries, observer){
  entries.forEach(entry => {
    // console.log(entry);
    // console.log(entry.isIntersecting);
  eventBusService.$emit('searchPos',entry.isIntersecting)

  });
}, options);

observer.observe(sectionOne);

},1000)



},
destroyed(){
  eventBusService.$emit('headerFixed' , false)
  // eventbus.$emit('headerFixed' , false)
  
        // eventBusService.$off('headerFixed');
    
},
computed: {
    spaces() {

      return this.$store.getters.spaces;
    },
  },
  methods:{
    async gotoSpaces({field, value}){
      try {
        this.$store.commit({type: 'setFilterField', field:field, value:value})
        await this.$store.dispatch({type: 'loadSpaces'})//TODO this does not need to be here - they are also loaded in the app page, lets move all filtering to the load function
        this.$router.push('/space');

      } catch(err) {
        console.log('error in store moving to space-app from homepage', err);
        throw err;
      }
    }
  }
};
</script>

<style></style>
