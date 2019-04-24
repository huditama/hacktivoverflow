<template>
  <v-responsive>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">Welcome to HacktivOverflow</h3>

          <span
            class="subheading"
          >Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>

          <v-divider class="my-3"></v-divider>

          <div class="title mb-3">Check out the forum!</div>

          <!-- REGISTER BUTTON -->
          <router-link to="/register">
            <v-btn class="mx-0" color="primary" large>Sign up today!</v-btn>
          </router-link>
          <!-- END OF REGISTER BUTTON -->
        </v-flex>
      </v-layout>
    </v-container>
  </v-responsive>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  margin-top: 5%;
}
</style>
