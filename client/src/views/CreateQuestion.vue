<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex>
        <v-form ref="form" lazy-validation v-on:submit.prevent="createQuestion">
          <center>
            <h2>Start a Thread!</h2>
          </center>

          <!-- TITLE -->
          <v-text-field v-model="title" :rules="[rules.required]" label="Title" required></v-text-field>
          <!-- END OF TITLE -->

          <!-- DESCRIPTION -->
          <!-- CKEDITOR -->
          <ckeditor
            style="height:500px"
            :editor="editor"
            v-model="description"
            :rules="[rules.required]"
            counter
            hint="Be as specific as possible!"
          ></ckeditor>
          <!-- END OF CKEDITOR -->
          <!-- END OF DESCRIPTION -->

          <!-- SUBMIT BUTTON -->
          <v-btn color="info" type="submit">Submit!</v-btn>
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  data: () => ({
    editor: ClassicEditor,
    title: "",
    description: "",
    rules: {
      required: value => !!value || "Required."
    }
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    createQuestion() {
      const { title, description } = this;
      let token = localStorage.getItem("token");
      let UserId = localStorage.getItem("UserId");
      this.$axios
        .post(
          "/questions",
          { title, description, UserId },
          { headers: { token } }
        )
        .then(({ data }) => {
          const { message } = data;
          this.$swal("Success!", message, "success");
          this.$store.dispatch("createQuestion");
          this.$router.push("/dashboard");
        })
        .catch(err => {
          const { errors } = err.response.data;
          let errorMessages = [];
          for (let key in errors) errorMessages.push(errors[key].message);
          errorMessages = errorMessages.join("\n");
          this.$swal("Oops...", errorMessages, "error");
        });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 60% !important;
  margin-top: 4%;
}


</style>