<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <v-btn
            color="primary"
            fab
            x-small
            dark >
          <v-icon>mdi-book-lock</v-icon>
        </v-btn>
      </span>
    </template>
    <v-card>
      <v-card-title class='justify-space-between'>
        <span class="headline">{{ $t("users.time_reports.title") }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>

          <v-row v-for="timeReport in timeReports" :key="timeReport.id">
            <v-col cols="6">
              {{ timeReport.from }} - {{ timeReport.to }}
            </v-col>
            <v-col cols="4">
              {{ $t(`users.time_reports.${ timeReport.approved ? 'approved' : 'unapproved' }`)}}
            </v-col>
            <v-col cols="2" align="end">
              <v-btn
                v-if="timeReport.approved"
                color="warning"
                fab
                x-small
                dark
                @click="unblock(timeReport)">
                <v-icon>mdi-lock-open</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-row v-if="timeReports.length === 0">
            <v-col>
              {{ $t("users.time_reports.no_reports") }}
            </v-col>
          </v-row>

        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">{{ $t("close") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {

    props: {
      userId: {
        type: Number,
        required: true
      }
    },

    data() {
      return {
        dialog: false,
        timeReports: []
      }
    },

    watch: {
      dialog: function(value) {
        if(value)
          this.fetchUserTimeReports()
      }
    },

    methods: {
      ...mapMutations(["updateSnack"]),

      async fetchUserTimeReports() {
        const response = await this.$api.getUserTimeReports(this.userId)
        if(response.data)
          this.timeReports = response.data
      },

      async unblock(timeReport) {
        const response = await this.$api.unblockUserTimeReport(this.userId, timeReport.id)
        if(response.data) {
          const timeReportIndex = this.timeReports.findIndex(p => p.id === timeReport.id)
          this.timeReports[timeReportIndex].approved = false
          this.updateSnack({ message: this.$t("users.time_reports.was_unblocked"), color: "green" })
        }

      }
    }

  }
</script>

<style>
  .checkbox-margin-0{
    margin-top: 0px;
  }
</style>
