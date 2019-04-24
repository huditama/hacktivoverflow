<template>
  <center>
    <h2 style="margin-top:5%;">Current Job Openings</h2>
    <v-data-table
      :headers="headers"
      :items="jobs"
      class="elevation-1"
      style="width:90%;margin-bottom:5%"
    >
      <template v-slot:items="props">
        <td>{{ props.item.company }}</td>
        <td class="text-xs-left">{{ props.item.location }}</td>
        <td class="text-xs-left">{{ props.item.title }}</td>
        <td class="text-xs-left" v-html="props.item.how_to_apply"></td>
        <td class="text-xs-left">{{ props.item.type }}</td>
      </template>
    </v-data-table>
  </center>
</template>

<script>
import { mapState } from "vuex";
export default {
  // mounted() {
  //   this.socket.on("jobs", data => {
  //     this.jobs = data;
  //   });
  // },
  data() {
    return {
      headers: [
        {
          text: "Company",
          align: "left",
          sortable: false,
          value: "company"
        },
        { text: "Location", value: "location", sortable: false },
        { text: "Title", value: "title", sortable: false },
        { text: "How to Apply", value: "how_to_apply", sortable: false },
        { text: "Type", value: "type", sortable: false }
      ]
    };
  },
  computed: mapState(["jobs"])
};
</script>
<style>
</style>
