<template>
  <div class="msg">
      <p>this is a message {{}} </p>
  </div>
</template>

<script
export default {
    props:['spaceId'],
    created(){
        socketService.emit("spaceView", this.space._id);
        socketService.on("viewingSpace", this.showViewMsg);
        socketService.on("bookedSpace", this.showBookedMsg);
    },
    methods:{
        showViewMsg(){
            console.log('showViewMsg...');
        },
        showBookedMsg(){
            console.log('showBookedMsg...');
        }
    }

}
</script>

<style>

</style>