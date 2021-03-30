<template>
  <v-app>
    <Sidebar />
    <v-main>
      <!-- <Header /> -->
        <v-container :fluid="true" class="main-container">
          <!-- <PendingTimeReportNotifications /> -->
          <nuxt />
        </v-container>

      <Snackbar />
  </v-main>
  </v-app>
</template>

<script>
import Snackbar from '~/components/layout/snackbar.vue'
import Sidebar from '~/components/layout/sidebar.vue'
import PendingTimeReportNotifications from '~/components/layout/pending_time_report_notifications.vue'
import { mapGetters } from 'vuex'

export default {
  middleware: ['auth', 'spa_redirects'],
  components: { Sidebar, Snackbar, PendingTimeReportNotifications },

  computed: {
    ...mapGetters(["userAuthorized"])
  }
}
</script>

<style scoped>
  .navbar {
    border-right: 1px solid #E0E0E0;
  }

  .main-container{
    padding: 0 12px;
    background-color: #F5F5F5;
    height: 100%;
  }
</style>
