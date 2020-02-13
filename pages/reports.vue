<template>
  <div>
    <h1>
      {{ $t('reports.title') }}
      <v-btn
        v-if='tasks.length && !reportLink'
        class="ma-2"
        :loading="loadingReport"
        :disabled="loadingReport"
        color="info"
        @click="getReportLink"
      >
        {{ $t('reports.generate') }}
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>mdi-cached</v-icon>
          </span>
        </template>
      </v-btn>

      <v-btn
        v-if='reportLink'
        class="ma-2"
        color="success"
        :href="reportLink"
      >
      {{ $t('reports.download') }}
      </v-btn>
    </h1>

    <v-row>
      <v-col cols="3">
        <date-select
          :label="$t('reports.from_date')"
          :max="filters.toDate"
          v-model="filters.fromDate"

        />
      </v-col>

      <v-col cols="3">
        <date-select
        :label="$t('reports.to_date')"
          :min="filters.fromDate"
          v-model="filters.toDate"
        />
      </v-col>

      <v-col cols="3">
        <v-select
          v-model="quickDate"
          :items="quickDates"
          single-line
          :label="$t('reports.quick_date')"
        ></v-select>
      </v-col>

      <v-col v-if='users.length' cols="3">
        <v-select
          v-model="filters.userId"
          :items="users"
          item-text="name"
          item-value="id"
          item-key="id"
          single-line
          :label="$t('reports.employee')"
        ></v-select>
      </v-col>
    </v-row>

    <v-divider />

    <v-data-table
      v-if="tasks.length > 0"
      :headers="headers"
      :items="tasks"
      :disable-sort="true"
      :footer-props="{
        'items-per-page-options': [25, 50]
      }"
      :items-per-page="50"
      item-key="name"
    >
    </v-data-table>
    <h3 v-else>{{ $t('reports.no_records') }}</h3>

  </div>
</template>

<script>
import dateSelect from "@/components/reports/date_select"
import { mapGetters, mapState } from 'vuex'
import { DateTime } from 'luxon'

export default {

  components: {
    "date-select": dateSelect
  },

  data() {
    return {
      quickDate: null,
      reportLink: null,
      loadingReport: false,
      fromDateMenu: false,
      tasks: [],
      users: [],
      totalAmount: 0.0,
      quickDates: [
        { value: "this_week", text: this.$t("reports.this_week") },
        { value: "last_week", text: this.$t("reports.last_week") },
        { value: "this_month", text: this.$t("reports.this_month") },
        { value: "last_month", text: this.$t("reports.last_month") }
      ],
      filters: {
        fromDate: null,
        toDate: null,
        userId: null
      }
    }
  },

  mounted(){
    this.filters.userId = this.user.id
    if(this.isAdmin)
      this.fetchUsers()
  },

  computed: {
    ...mapGetters(['isAdmin']),
    ...mapState(['user']),

    headers(){
      return [
        { text: this.$t("reports.project"), value: 'project_name' },
        { text: this.$t("reports.date"), value: 'assigned_date' },
        { text: this.$t("reports.employee"), value: 'user_name' },
        { text: this.$t("reports.description"), value: 'description' },
        { text: `${this.$t("reports.amount")}(${this.totalAmount})`, value: 'spent_time' }
      ]
    }
  },

  watch: {
    filters: {
      handler: function(){
        if(this.filters.fromDate && this.filters.toDate){
          this.getTasks()
        }
      },
      deep: true
    },

    quickDate: function(){
      const currentTime = DateTime.fromObject({ zone: this.user.timezone });
      switch(this.quickDate){
        case 'this_week':
          this.setDates('week', currentTime); break;
        case 'last_week':
          this.setDates('week', currentTime.minus({days: 7})); break;
        case 'this_month':
          this.setDates('month', currentTime); break;
        case 'last_month':
          this.setDates('month', currentTime.minus({month: 1})); break;
      }
    }
  },

  methods: {
    async getTasks(){
      this.reportLink = null
      const response = await this.$api.allTimeRecords(this.handledFilters())
      this.totalAmount = response.data.total_spent_time
      this.tasks = response.data.time_records
    },

    async fetchUsers(){
      const response = await this.$api.allUsers()
      this.users = response.data
    },

    handledFilters(){
      return {
        fromDate: (new Date(this.filters.fromDate)).getTime() / 1000,
        toDate: (new Date(this.filters.toDate)).getTime() / 1000,
        userId: this.filters.userId || this.user.id
      }
    },

    async getReportLink(){
      this.loadingReport = true
      const response = await this.$api.generateReport(this.handledFilters())
      this.reportLink = response.data.link
      this.loadingReport = false
    },

    setDates(interval, time){
      this.filters.fromDate = time.startOf(interval).toFormat('yyyy-LL-dd')
      this.filters.toDate = time.endOf(interval).toFormat('yyyy-LL-dd')
    }
  }
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
