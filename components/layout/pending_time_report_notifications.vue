<template>
  <div>
    <div 
      v-for="period in unapprovedPeriods"
      :key="period.id" 
      class="block">
      <div class="notification d-flex flex-sm-row flex-column justify-space-between">
        <span :class="$vuetify.breakpoint.smAndDown ? 'small-message' : 'message'">
          {{ $t('time_reports.please_approve_your_report_for_following_dates', { from: period.from, to: period.to }) }}
        </span>
        <v-btn
          dark
          small
          outlined
          @click="approve(period.id)"
          color="white">
          {{ $t('time_reports.approve') }}
          <v-icon>mdi-lock-check</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {

  computed: {
    ...mapState(["unapprovedPeriods"])
  },

  methods: {
    ...mapActions(["approveTimeReport"]),
    ...mapMutations(["updateSnack"]),

    async approve(id){
      try {
        await this.approveTimeReport(id)
        this.updateSnack({
          message: this.$t("time_reports.you_approved_this"),
          color: "green"
        })
      } catch(data){
        this.handleError(data);
      }
    },

    handleError({ errors, dates }) {
      const links = dates.map((date) => `<a href='/tasks?date=${date}' class="snackbar-link">${date}</a>`).join(', ');
      const message = [errors.base[0], links].join(' ');
      this.updateSnack({ message: message, color: "red" })
    }
  }
}
</script>

<style scoped>
  .block {
    margin-top: 1.5rem;
    padding: 0px 0.3rem;
  }

  .notification {
    background-color: #EFB625;
    color: #FFFFFF;
    border-radius: 5px;
    padding: 10px 30px;
  }

  .message {
    line-height: 175%;
  }

  .small-message {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
</style>
