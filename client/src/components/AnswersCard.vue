<template>
  <div>
    <center>
      <h3 style="margin-top:5%">
        <i>ANSWERS</i>
      </h3>
    </center>
    <div v-for="(answer, index) in answers" :key="index" style="padding: 15px">
      <v-card v-if="answer">
        <!-- ANSWER -->
        <v-card-title>
          <!-- VOTES -->
          <div>
            <!-- <center> -->
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
                  <v-icon v-if="answer.upvotes.length - answer.downvotes.length == 0">thumbs_up_down</v-icon>
                </h5>
              </span>
            </h3>
            <!-- </center> -->
          </div>
          <!-- END OF VOTES -->
          <v-spacer></v-spacer>
          <div>
            <h2 v-html="answer.answer"></h2>
          </div>
          <v-spacer></v-spacer>
        </v-card-title>
        <!-- END OF ANSWER -->
        <v-divider></v-divider>
        <v-card-title primary-title style="background-color:whitesmoke;">
          <!-- AUTHOR NAME -->
          <h5
            v-if="answer"
          >Answered by: {{answer.UserId.first_name + ' ' + answer.UserId.last_name}}</h5>
          <!-- END OF AUTHOR NAME -->
          <v-spacer></v-spacer>
          <!-- UPVOTE BUTTON -->
          <v-btn icon v-on:click="upvote(answer._id)">
            <v-icon color="blue">thumb_up</v-icon>
          </v-btn>
          <!-- END OF UPVOTE BUTTON -->

          <!-- DOWNVOTE BUTTON -->
          <v-btn icon v-on:click="downvote(answer._id)">
            <v-icon color="red">thumb_down</v-icon>
          </v-btn>
          <!-- END OF DOWNVOTE -->
        </v-card-title>

        <v-divider></v-divider>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ["answers"],
  methods: {
    upvote(AnswerId) {
      let token = localStorage.getItem("token");
      this.$axios
        .patch(`/answers/upvote/${AnswerId}`, {}, { headers: { token } })
        .then(({ data }) => {
          const { message } = data;
          console.log(message);
          this.$emit("getUpdatedAnswers");
        })
        .catch(err => {
          const { message } = err.response.data;
          this.$swal("Error!", message, "error");
        });
    },
    downvote(AnswerId) {
      let token = localStorage.getItem("token");
      this.$axios
        .patch(`/answers/downvote/${AnswerId}`, {}, { headers: { token } })
        .then(({ data }) => {
          const { message } = data;
          console.log(message);
          this.$emit("getUpdatedAnswers");
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
.v-card__title--primary {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>
