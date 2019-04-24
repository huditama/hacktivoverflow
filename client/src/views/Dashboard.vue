<template>
  <v-container id="dashboardContainer">
    <v-layout justify-center align-center>
      <v-flex>
        <div v-if="this.$route.path == '/dashboard' && allQuestions.length">
          <QuestionCard
          v-bind:search="search"
          ></QuestionCard>
        </div>

        <v-flex xs12 v-if="!allQuestions.length">
          <center>
            <router-link to="/createQuestion" style="textDecoration:none;">
              <v-card dark color="primary" width="50%" style="margin-top:28%">
                <v-card-text
                  class="px-0"
                  style="font-size:20px"
                >There's nothing here! Wanna start a thread?</v-card-text>
              </v-card>
            </router-link>
          </center>
        </v-flex>

        <router-view/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuestionCard from "../components/QuestionCard";
import { mapState } from "vuex";
export default {
  props: ['search'],
  data() {
    return {};
  },
  components: {
    QuestionCard
  },
  computed: mapState(["allQuestions"])
};
</script>

<style scoped>
#dashboardContainer {
  width: 60% !important;
}
</style>
