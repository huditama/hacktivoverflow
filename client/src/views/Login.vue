<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          v-on:submit.prevent="login"
          style="border:3px solid black; padding:30px"
        >
          <center>
            <h2>Continue Exploring!</h2>
          </center>

          <!-- EMAIL -->
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <!-- END OF EMAIL -->

          <!-- PASSWORD -->
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <!-- END OF PASSWORD -->

          <!-- SUBMIT BUTTON -->
          <v-btn color="info" type="submit">Let's Go!</v-btn>
          <!-- END OF SUBMIT BUTTON -->

          <!-- RESET FORM -->
          <v-btn color="error" @click="reset">Reset Form</v-btn>
          <!-- END OF RESET FORM -->
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    valid: true,
    show1: false,
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    rules: {
      required: value => !!value || "Required."
    }
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    login() {
      const { email, password } = this;
      this.$store.dispatch("login", { email, password });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 30% !important;
  margin-top: 4%;
}
</style>