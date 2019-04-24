<template>
  <div>
    <v-container id="questionContainer">
      <v-layout>
        <v-flex>
          <!-- QUESTION CARD -->
          <v-card v-if="question">
            <v-card-title>
              <i>
                <b style="margin-right:5px">Published at</b>
              </i>
              {{new Date(question.createdAt).toDateString()}}
              <i>
                <b
                  v-if="question"
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

            <v-card-actions
              style="display:flex;justify-content:space-evenly;background-color:whitesmoke;"
            >
              <!-- ANSWER BUTTON -->
              <AnswerDialog
                v-bind:QuestionId="this.$route.params.QuestionId"
                v-on:createAnswer="createAnswer"
              ></AnswerDialog>
              <!-- END OF ANSWER BUTTON -->

              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>

              <!-- UPVOTE BUTTON -->
              <v-btn icon v-on:click="upvote">
                <v-icon color="blue">thumb_up</v-icon>
              </v-btn>
              <!-- END OF UPVOTE BUTTON -->

              <!-- DOWNVOTE BUTTON -->
              <v-btn icon v-on:click="downvote">
                <v-icon color="red">thumb_down</v-icon>
              </v-btn>
              <!-- END OF DOWNVOTE -->
            </v-card-actions>
          </v-card>

          <!-- ANSWERS CARD -->
          <v-container id="answerContainer">
            <v-layout justify-center align-center>
              <v-flex>
                <AnswersCard
                  v-bind:answers="answers"
                  v-if="answers.length"
                  v-on:getUpdatedAnswers="getAnswers(question._id)"
                ></AnswersCard>
              </v-flex>
            </v-layout>
          </v-container>
          <!-- END OF ANSWERS CARD -->

          <!-- END OF QUESTION CARD -->
        </v-flex>
      </v-layout>
    </v-container>
    <!-- IF THERE ARE NO ANSWERS -->
    <center>
      <v-card dark style="width:30%" v-if="!answers.length">
        <v-card-text class="px-0">THERE ARE NO ANSWERS YET</v-card-text>
      </v-card>
    </center>
    <!-- END OF IF THERE ARE NO ANSWERS -->
  </div>
</template>

<script>
import AnswersCard from "../components/AnswersCard";
import AnswerDialog from "../components/AnswerDialog";
export default {
  data() {
    return {
      question: "",
      answers: []
    };
  },
  created() {
    const { QuestionId } = this.$route.params;
    this.getQuestionDetails(QuestionId);
    this.getAnswers(QuestionId);
  },
  components: {
    AnswersCard,
    AnswerDialog
  },
  methods: {
    getQuestionDetails(QuestionId) {
      let token = localStorage.getItem("token");
      this.$axios
        .get(`/questions/${QuestionId}`, { headers: { token } })
        .then(({ data }) => {
          this.question = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAnswers(QuestionId) {
      let token = localStorage.getItem("token");
      this.$axios
        .get(`/answers/${QuestionId}`, { headers: { token } })
        .then(({ data }) => {
          this.answers = data;
          this.$store.dispatch("getUserAnswers");
        })
        .catch(err => {
          console.log(err);
        });
    },
    createAnswer() {
      this.getAnswers(this.$route.params.QuestionId);
    },
    upvote() {
      let { QuestionId } = this.$route.params;
      let token = localStorage.getItem("token");
      this.$axios
        .patch(`/questions/upvote/${QuestionId}`, {}, { headers: { token } })
        .then(({ data }) => {
          const { message } = data;
          this.getQuestionDetails(QuestionId);
          this.$store.dispatch("getQuestions");
          this.$store.dispatch("getUserQuestions");
        })
        .catch(err => {
          const { message } = err.response.data;
          this.$swal("Error!", message, "error");
        });
    },
    downvote() {
      let { QuestionId } = this.$route.params;
      let token = localStorage.getItem("token");
      this.$axios
        .patch(`/questions/downvote/${QuestionId}`, {}, { headers: { token } })
        .then(({ data }) => {
          const { message } = data;
          this.getQuestionDetails(QuestionId);
          this.$store.dispatch("getQuestions");
          this.$store.dispatch("getUserQuestions");
        })
        .catch(err => {
          const { message } = err.response.data;
          this.$swal("Error!", message, "error");
        });
    }
  }
};
</script>

<style scoped>
#answerContainer {
  width: 90% !important;
}

#questionContainer {
  width: 90% !important;
}
</style>
