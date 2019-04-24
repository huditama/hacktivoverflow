<template>
  <v-app>
    <!-- NAVBAR -->
    <v-toolbar dark>
      <v-toolbar-title class="white--text">HacktivOverflow</v-toolbar-title>
      <!-- SEARCH BAR -->
      <v-text-field
        placeholder="Search"
        style="width:10%;margin-left:3%;"
        v-if="isLoggedIn && this.$route.path == '/dashboard'"
        v-model="search"
      ></v-text-field>
      <!-- END OF SEARCH BAR -->
      <v-spacer></v-spacer>

      <!-- HOME BUTTON -->
      <router-link to="/" v-if="!isLoggedIn" style="textDecoration: none;">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>home</v-icon>
            </v-btn>
          </template>
          <span>Home</span>
        </v-tooltip>
      </router-link>

      <router-link to="/dashboard" v-if="isLoggedIn" style="textDecoration: none;">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>home</v-icon>
            </v-btn>
          </template>
          <span>Questions</span>
        </v-tooltip>
      </router-link>
      <!-- END OF HOME BUTTON -->

      <!-- DASHBOARD BUTTON -->
      <Dropdown v-if="isLoggedIn"/>
      <!-- END OF DASHBOARD BUTTON -->

      <!-- JOBS BUTTON -->
      <router-link to="/jobs" style="textDecoration: none;">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>announcement</v-icon>
            </v-btn>
          </template>
          <span>Jobs</span>
        </v-tooltip>
      </router-link>
      <!-- END OF JOBS BUTTON -->

      <!-- CREATE QUESTION BUTTON -->
      <router-link to="/createQuestion" v-if="isLoggedIn" style="textDecoration: none;">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>playlist_add</v-icon>
            </v-btn>
          </template>
          <span>Create a Question</span>
        </v-tooltip>
      </router-link>
      <!-- END OF CREATE QUESTION BUTTON -->

      <!-- REGISTER BUTTON -->
      <router-link to="/register" v-if="!isLoggedIn" style="textDecoration: none;">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>person_add</v-icon>
            </v-btn>
          </template>
          <span>Register</span>
        </v-tooltip>
      </router-link>
      <!-- END OF REGISTER BUTTON -->

      <!-- LOGIN BUTTON -->
      <router-link to="/login" v-if="!isLoggedIn" style="textDecoration: none;">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>input</v-icon>
            </v-btn>
          </template>
          <span>Login</span>
        </v-tooltip>
      </router-link>
      <!-- END OF LOGIN BUTTON -->

      <!-- LOGOUT BUTTON -->
      <v-tooltip bottom v-if="isLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" v-on:click="logout">
            <v-icon>settings_power</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
      <!-- END OF LOGOUT BUTTON -->
    </v-toolbar>
    <!-- END OF NAVBAR -->

    <v-content>
      <router-view v-bind:search="search"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Dropdown from "./components/Dropdown";
export default {
  name: "App",
  data() {
    return {
      search: "",
      socket: io("http://localhost:3000")
    };
  },
  computed: mapState(["isLoggedIn"]),
  components: {
    Dropdown
  },
  mounted() {
    this.socket.on("jobs", data => {
      this.$store.commit("getJobs", data);
    });
  },
  created() {
    // Verify user token
    if (localStorage.getItem("token")) this.verify();
  },
  methods: {
    verify() {
      let token = localStorage.getItem("token");
      this.$axios
        .post("/users/verify", { token }, { headers: { token } })
        .then(({ data }) => {
          this.$store.dispatch("verify");
          this.$store.dispatch("getQuestions");
          this.$store.dispatch("getUserQuestions");
          this.$store.dispatch("getUserAnswers");
          this.$router.push("/dashboard");
          console.log(data.message);
        })
        .catch(err => {
          const { message } = err.response.data;
          this.$swal("Error!", message, "error");
          this.$router.push("/");
          localStorage.clear();
        });
    },
    logout() {
      this.$store.commit("logout");
      this.$swal("Bye bye!");
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style>
.ck-editor__editable_inline {
  min-height: 200px !important;
}
</style>
