<template>
  <v-container id="userDashboardContainer">
    <v-layout justify-center align-center>
      <v-flex>
        <UserQuestionCard v-if="myQuestions.length"/>
        <v-flex xs12 v-if="!myQuestions.length">
          <center>
            <router-link to="/createQuestion" style="textDecoration:none;">
              <v-card dark color="primary" width="50%" style="margin-top:28%">
                <v-card-text
                  class="px-0"
                  style="font-size:20px"
                >You haven't published anything! Wanna start?</v-card-text>
              </v-card>
            </router-link>
          </center>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserQuestionCard from "../components/UserQuestionCard";
import { mapState } from "vuex";
export default {
  components: {
    UserQuestionCard
  },
  computed: mapState(["myQuestions"]),
  created() {}
};
</script>

<style scoped>
#userDashboardContainer {
  width: 60% !important;
}
</style>
