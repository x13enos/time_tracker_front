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
      <v-col class="col-sm-3 col-6">
        <date-select
          :label="$t('reports.from_date')"
          :max="filters.toDate"
          v-model="filters.fromDate"

        />
      </v-col>

      <v-col class="col-sm-3 col-6">
        <date-select
        :label="$t('reports.to_date')"
          :min="filters.fromDate"
          v-model="filters.toDate"
        />
      </v-col>

      <v-col class="col-sm-3 col-6">
        <v-select
          v-model="quickDate"
          :items="quickDates"
          single-line
          :label="$t('reports.quick_date')"
        ></v-select>
      </v-col>

      <v-col v-if='users.length' class="col-sm-3 col-6">
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
      :items="indexedItems"
      :disable-sort="true"
      :footer-props="{
        'items-per-page-options': [25, 50]
      }"
      :items-per-page="50"
      :single-expand="false"
      :expanded.sync="expanded"
      item-key="id"
    >
      <template v-slot:item="{ item, expand, isExpanded }">
        <template v-if="item.tasks.length === 1">
          <tr>
            <td>{{ item.tasks[0].project_name }}</td>
            <td nowrap>{{ item.tasks[0].assigned_date }}</td>
            <td>{{ item.tasks[0].user_name }}</td>
            <td>{{ item.tasks[0].description }}</td>
            <td>{{ item.tasks[0].spent_time }}</td>
            <td></td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td>{{ selectValueForMultipleRecords(item.tasks, 'project_name') }}</td>
            <td></td>
            <td>{{ selectValueForMultipleRecords(item.tasks, 'user_name') }}</td>
            <td><span class="multiple-records-font">{{ descriptionForMultipleRecords(item.tasks) }}</span></td>
            <td>
              <span class="multiple-records-font">
                {{ totalTime(item.tasks) }}
              </span>
            </td>
            <td >
              <v-icon
                @click="expand(!isExpanded)">
                  mdi-chevron-{{ isExpanded ? "up" : "down" }}
              </v-icon>
            </td>
          </tr>
        </template>
      </template>
      <template v-slot:expanded-item="{ item }">
        <tr class="blue lighten-5"
          v-for="task in item.tasks"
          :key="task.id"
          v-if="item.tasks.length > 1">
          <td>{{ task.project_name }}</td>
          <td nowrap>{{ task.assigned_date }}</td>
          <td>{{ task.user_name }}</td>
          <td class="expanded-item-description">{{ task.description }}</td>
          <td>{{ task.spent_time }}</td>
          <td></td>
        </tr>
      </template>
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
      expanded: [],
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

    indexedItems () {
      return this.tasks.map((tasks, index) => ({
        id: index,
        tasks
      }))
    },

    headers(){
      return [
        { text: this.$t("reports.project"), value: 'project_name' },
        { text: this.$t("reports.date"), value: 'assigned_date' },
        { text: this.$t("reports.employee"), value: 'user_name' },
        { text: this.$t("reports.description"), value: 'description' },
        { text: `${this.$t("reports.amount")}(${this.totalAmount})`, value: 'spent_time' },
        { text: '', value: 'expand', align: 'end' }
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
          this.setDates('week', currentTime.minus({ days: 7 })); break;
        case 'this_month':
          this.setDates('month', currentTime); break;
        case 'last_month':
          this.setDates('month', currentTime.minus({ month: 1 })); break;
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
    },

    totalTime(tasks){
      const time = tasks.reduce((accumulator, task) => {
        return accumulator + task.spent_time
      }, 0)
      return parseFloat(time).toFixed(2)
    },

    selectValueForMultipleRecords(tasks, value){
      const values = tasks.map((task) => {
        return task[value]
      })
      const uniqueValues = [...new Set(values)]
      if(uniqueValues.length > 1){
        return uniqueValues.length
      } else {
        return uniqueValues[0]
      }
    },

    descriptionForMultipleRecords(tasks){
      const number = tasks.length - 1
      return `${tasks[0].description.substring(0, 20)}... ${this.$tc("reports.more_tasks", number, { num: number })}`
    }
  }
}
</script>

<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  .multiple-records-font{
    font-weight: 600;
  }

  .expanded-item-description{
    padding-left: 35px;
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
