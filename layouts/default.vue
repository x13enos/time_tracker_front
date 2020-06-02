<template>
  <v-app>
    <Header />
    <v-content>
      <v-container :fluid="true" class="main-container">
        <v-row align="start" justify="start" class="main-row">
          <v-col cols="12">
            <PendingTimeReportNotifications />
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from '~/components/layout/snackbar.vue'
import Header from '~/components/layout/header.vue'
import PendingTimeReportNotifications from '~/components/layout/pending_time_report_notifications.vue'

export default {
  middleware: 'auth',
  components: { Header, Snackbar, PendingTimeReportNotifications }
}
</script>

<style scoped>
  .main-container{
    background-color: #f2f3fa;
    height: 100%;
  }

  .main-row{
    background-color: white;
    margin: 2rem 1rem 0rem 1rem;
  }
</style>
