<template>
  <v-container id="userAnswersContainer">
    <v-layout justify-center align-center>
      <v-flex>
        <UserAnswerCard v-if="myAnswers.length"/>
        <v-flex xs12 v-if="!myAnswers.length">
          <center>
            <router-link to="/dashboard" style="textDecoration:none;">
              <v-card dark color="primary" width="50%" style="margin-top:28%">
                <v-card-text
                  class="px-0"
                  style="font-size:20px"
                >You haven't posted any reply! Start exploring!</v-card-text>
              </v-card>
            </router-link>
          </center>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import UserAnswerCard from "../components/UserAnswerCard";
export default {
  computed: mapState(["myAnswers"]),
  components: {
    UserAnswerCard
  }
};
</script>

<style scoped>
#userAnswersContainer {
  width: 60% !important;
}
</style>
