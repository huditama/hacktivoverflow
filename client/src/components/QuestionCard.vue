<template>
  <div>
    <div v-for="(question, index) in filterQuestions" :key="index" style="padding: 15px">
      <!-- QUESTIONS -->
      <v-card >
        <v-card-title>
          <i>
            <b style="margin-right:5px">Published at</b>
          </i>
          {{new Date(question.createdAt).toDateString()}}
          <i>
            <b
              style="margin-left:5px"
            >by {{question.UserId.first_name + ' ' + question.UserId.last_name}}</b>
          </i>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-title primary-title>
          <!-- VOTES -->
          <div>
            <center>
              <h3>
                {{question.upvotes.length - question.downvotes.length}}
                <span>
                  <h5>
                    <v-icon
                      color="red"
                      v-if="question.upvotes.length - question.downvotes.length < 0"
                    >thumb_down</v-icon>
                    <v-icon
                      color="blue"
                      v-if="question.upvotes.length - question.downvotes.length > 0"
                    >thumb_up</v-icon>
                    <v-icon
                      v-if="question.upvotes.length - question.downvotes.length == 0"
                    >thumbs_up_down</v-icon>
                  </h5>
                </span>
              </h3>
            </center>
          </div>
          <!-- END OF VOTES -->

          <v-spacer></v-spacer>

          <!-- QUESTION TITLE -->
          <h3 class="headline mb-0">{{question.title}}</h3>
          <!-- END OF QUESTION TITLE -->

          <v-spacer></v-spacer>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions style="background-color:whitesmoke">
          <!-- VIEW BUTTON -->
          <router-link :to="`/dashboard/view/${question._id}`" style="textDecoration: none;">
            <v-btn flat color="orange">View</v-btn>
          </router-link>
          <!-- END OF VIEW BUTTON -->

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <!-- END OF QUESTIONS -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ['search'],
  created() {
    this.questions = this.allQuestions
  },
  data() {
    return {
      questions: []
    };
  },
  computed: {
    filterQuestions() {
      return this.questions.filter(question => {
        return question.title.toLowerCase().match(this.search);
      });
    },
    ...mapState(["allQuestions"])
  }
};
</script>

<style>
</style>
