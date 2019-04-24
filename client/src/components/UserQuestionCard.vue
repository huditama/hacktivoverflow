<template>
  <div>
    <div v-for="(question, index) in myQuestions" :key="index" style="padding: 15px">
      <!-- QUESTIONS -->
      <v-card>
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

        <!-- DESCRIPTION -->
        <v-card-text v-html="question.description"></v-card-text>
        <!-- END OF DESCRIPTION -->

        <v-divider></v-divider>

        <v-card-actions style="background-color:whitesmoke;">
          <!-- VIEW BUTTON -->
          <router-link :to="`/dashboard/view/${question._id}`" style="textDecoration: none;">
            <v-btn flat color="orange">View</v-btn>
          </router-link>
          <!-- END OF VIEW BUTTON -->

          <!-- EDIT BUTTON -->
          <EditDialog v-bind:questionDetails="question"/>
          <!-- END OF EDIT BUTTON -->

          <!-- DELETE BUTTON -->
          <v-btn flat color="orange" v-on:click="deleteQuestion(question._id)">DELETE</v-btn>
          <!-- END OF DELETE BUTTON -->
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <!-- END OF QUESTIONS -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EditDialog from "../components/EditDialog";

export default {
  computed: mapState(["myQuestions"]),
  components: {
    EditDialog
  },
  methods: {
    deleteQuestion(QuestionId) {
      this.$swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this thread!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          let token = localStorage.getItem("token");
          this.$axios
            .delete(`/questions/${QuestionId}`, {
              headers: { token }
            })
            .then(({ data }) => {
              this.$swal("Poof! Your thread has been deleted!", {
                icon: "success"
              });
              this.$store.dispatch("getQuestions");
              this.$store.dispatch("getUserQuestions");
              this.$store.dispatch("getUserAnswers");
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
