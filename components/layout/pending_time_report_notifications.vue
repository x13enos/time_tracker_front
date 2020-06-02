<template>
  <div>
    <v-alert
      v-for="period in unapprovedPeriods"
      :key="period.id"
      outlined
      color="orange"
    >
      <div class="d-flex justify-space-between align-center">
        {{ $t('time_reports.please_approve_your_report_for_following_dates', { from: period.from, to: period.to }) }}
        <v-btn
          dark
          small
          @click="approve(period.id)"
          color="orange">
          {{ $t('time_reports.approve') }}
          <v-icon>mdi-lock-check</v-icon>
        </v-btn>
      </div>
    </v-alert>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex"

export default {

  computed: {
    ...mapState(["unapprovedPeriods"])
  },

  methods: {
    ...mapActions(["approveTimeReport"]),
    ...mapMutations(["updateSnack"]),

    async approve(id){
      await this.approveTimeReport(id)
      this.updateSnack({
        message: this.$t("time_reports.you_approved_this"),
        color: "green"
      })
    }
  }
}
</script>
