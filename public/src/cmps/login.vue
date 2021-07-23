<template>
  <div class="login popup-form">
    <!-- <p>{{ msg }}</p> -->

      
    <div v-if="loggedinUser">
      <h3>
        Loggedin User:
        {{ loggedinUser.username }}
        <button @click="doLogout">Logout</button>
      </h3>
    </div>
    <div v-else>
      <h4>Login or signup</h4>
      <hr>
      <p @click="closeLogin" class="close pointer">x</p>
      <h2>Welcome to Airbnb</h2>
      <form @submit.prevent="doLogin">

        <input class="text-input" type="text" placeholder="username" v-model="loginCred.username">

        <input class="text-input" type="text" v-model="loginCred.password" placeholder="User name" />
        <button>Login</button>
      </form>
<hr>
      <form @submit.prevent="doSignup">
        <h2>signup</h2>
        <input
        class="text-input"
          type="text"
          v-model="signupCred.fullname"
          placeholder="Your full name"
        />
        <input
        class="text-input"
          type="text"
          v-model="signupCred.password"
          placeholder="Password"
        />
        <input
        class="text-input"
          type="text"
          v-model="signupCred.username"
          placeholder="Username"
        />
        <!-- <input
          type="text"
          v-model="signupCred.isHost"
          placeholder="Do you own a property"
        /> -->
        <button>Signup</button>
      </form>

    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      msg: "",
      loginCred: { username: "user1", password: "123" },
      signupCred: { username: "", password: "", fullname: "" },
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  created() {
    // this.loadUsers();
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = "Please enter username/password";
        return;
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred });
        this.$emit('close-login');
        this.$router.push("/space");
      } catch (err) {
        console.log(err);
        this.msg = "Failed to login";
      }
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
    async doSignup() {
      if (
        !this.signupCred.fullname ||
        !this.signupCred.password ||
        !this.signupCred.username
      ) {
        this.msg = "Please fill up the form";
        return;
      }
      await this.$store.dispatch({ type: "signup", userCred: this.signupCred });
      this.$emit('close-login')
      this.$router.push("/space");
    },
    closeLogin(){
      this.$emit('close-login')
    }
  },
};
</script>