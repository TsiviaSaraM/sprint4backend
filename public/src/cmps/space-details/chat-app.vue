
<template>
<!-- TODO this is copied from toy up - need to update later -->
  <div class="chat-app">
    <p>this is the chat room</p>
    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{ msg.from }}:</span>{{ msg.txt }}
      </li>
    </ul>
    <p v-if="getTyper">{{ getTyper }} is typing...</p>
    <form @submit.prevent="sendMsg">
      <input
        @input="showTypingMsg"
        type="text"
        v-model="msg.txt"
        placeholder="Your msg"
      />
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import { socketService } from './../../services/socket.service.js';
export default {
  name: "chat-room",
  props: ['toy'],
  created() {
    socketService.emit("chat topic", this.topic);
    socketService.on("chat addMsg", this.addMsg);
    socketService.on("show-typer", this.setTyper);
    this.username = this.$store.getters.loggedinUser.fullname;
    this.msg.from = this.username;
    this.msgs = this.toy.msgs || []
  },
  data() {
    return {
      msg: {},
      msgs: [],
      topic: this.toy._id,
      username: "",
      typer: "",
    };
  },
  computed: {
    getTyper() {
      return this.typer;
    },
  },
  methods: {
    setTyper(typer) {
      this.typer = typer;
    },
    async addMsg(msg) {
      await socketService.emit("typing", ""); //unsetting the typer
      this.msgs.push(msg);
    },
    async sendMsg() {
      try {
        // TODO: next 2 lines not needed after connecting to backend
          this.addMsg(this.msg)
          setTimeout(()=>this.addMsg({from: 'Dummy', txt: 'Yey'}), 2000)
          socketService.emit("chat newMsg", this.msg);
        this.msg = {
          from: this.$store.getters.loggedinUser.fullname,
          txt: "",
        };
} catch (err) {
        console.log("error in sendMsg in chat room", err);
      }
    },
    showTypingMsg() {
      socketService.emit("typing", this.username);
    },
  },
};
</script>

<style>
</style>