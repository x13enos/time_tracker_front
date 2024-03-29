<template>
  <v-card v-if="reportWasApproved" class="elevation-12">
    <v-card-text>
      <h3> {{ $t("time_reports.you_approved_this") }}</h3>
    </v-card-text>
  </v-card>

  <v-card v-else class="elevation-12">
    <v-card-text>
      <span class='red--text' v-if="!!errorMessages" v-html="errorMessages" />
      <div v-else class="loader" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'auth',

  head() {
    return {
      title: this.$t('page_titles.timereport_approve')
    }
  },

  data(){
    return {
      errorMessages: {},
      reportWasApproved: false
    }
  },

  mounted(){
    if(this.$route.query.token){
      this.approveTimeReport()
    } else {
      this.$router.push("/")
    }
  },

  methods: {
    async approveTimeReport() {
      this.errorMessages = {}
      try {
        const response = await this.$api.approveTimeReport(
          this.$route.query.period_id,
          {
            token: this.$route.query.token,
            workspace_id: this.$route.query.workspace_id
          }
        )
        this.reportWasApproved = true
      } catch (data) {
        this.handleError(data);
      }
    },

    handleError({ errors, dates }) {
      const links = dates.map((date) => `<a href='/tasks?date=${date}' class="red--text">${date}</a>`).join(', ');
      this.errorMessages = [errors.base[0], links].join(' ');
    }
  }
}

</script>

<style scoped>

.loader {
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #000000;
  background: -moz-linear-gradient(left, #000000 10%, rgba(0,0,0, 0) 42%);
  background: -webkit-linear-gradient(left, #000000 10%, rgba(0,0,0, 0) 42%);
  background: -o-linear-gradient(left, #000000 10%, rgba(0,0,0, 0) 42%);
  background: -ms-linear-gradient(left, #000000 10%, rgba(0,0,0, 0) 42%);
  background: linear-gradient(to right, #000000 10%, rgba(0,0,0, 0) 42%);
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #000000;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
.loader:after {
  background: #ffffff;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>
