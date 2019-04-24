<template>
  <div>
    <div v-for="(answer, index) in myAnswers" :key="index" style="padding: 15px">
      <!-- ANSWERS -->
      <v-card>
        <v-card-title v-if="answer.QuestionId !== null">
          Answered
          <router-link
            :to="`/dashboard/view/${answer.QuestionId._id}`"
            style="textDecoration:none;margin-left:5px;margin-right:5px"
          >"{{answer.QuestionId.title}}"</router-link>
          on {{new Date(answer.createdAt).toDateString()}}
        </v-card-title>
        <v-card-title v-if="answer.QuestionId == null">
          <i>Thread owner has deleted the subject...</i>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-title primary-title>
          <!-- VOTES -->
          <div>
            <center>
              <h3>
                {{answer.upvotes.length - answer.downvotes.length}}
                <span>
                  <h5>
                    <v-icon
                      color="red"
                      v-if="answer.upvotes.length - answer.downvotes.length < 0"
                    >thumb_down</v-icon>
                    <v-icon
                      color="blue"
                      v-if="answer.upvotes.length - answer.downvotes.length > 0"
                    >thumb_up</v-icon>
                    <v-icon
                      v-if="answer.upvotes.length - answer.downvotes.length == 0"
                    >thumbs_up_down</v-icon>
                  </h5>
                </span>
              </h3>
            </center>
          </div>
          <!-- END OF VOTES -->

          <v-spacer></v-spacer>

          <!-- ANSWER TITLE -->
          <h6 class="headline mb-0" v-html="answer.answer"></h6>
          <!-- END OF ANSWER TITLE -->

          <v-spacer></v-spacer>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions style="background-color:whitesmoke;">
          <!-- VIEW BUTTON -->
          <div v-if="answer.QuestionId !== null">
            <router-link
              :to="`/dashboard/view/${answer.QuestionId._id}`"
              style="textDecoration: none;"
            >
              <v-btn flat color="orange">View</v-btn>
            </router-link>
          </div>
          <!-- END OF VIEW BUTTON -->

          <!-- EDIT BUTTON -->
          <EditAnswerDialog v-bind:answerDetails="answer"/>
          <!-- END OF EDIT BUTTON -->

          <!-- DELETE BUTTON -->
          <v-btn flat color="orange" v-on:click="deleteAnswer(answer._id)">DELETE</v-btn>
          <!-- END OF DELETE BUTTON -->
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <!-- END OF ANSWERS -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EditAnswerDialog from "./EditAnswerDialog";

export default {
  computed: mapState(["myAnswers"]),
  components: {
    EditAnswerDialog
  },
  methods: {
    deleteAnswer(AnswerId) {
      this.$swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this reply!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          let token = localStorage.getItem("token");
          this.$axios
            .delete(`/answers/${AnswerId}`, {
              headers: { token }
            })
            .then(({ data }) => {
              this.$swal("Poof! Your reply has been deleted!", {
                icon: "success"
              });
              this.$store.dispatch("getUserAnswers");
              //   this.$store.dispatch("getUserQuestions");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    }
  }
};
</script>

<style>
</style>
