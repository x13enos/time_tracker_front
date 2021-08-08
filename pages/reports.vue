<template>
  <div>
    <h1>
      {{ $t('reports.title') }}
      <v-btn
        v-if="tasks.length && !reportLink"
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
        v-if="reportLink"
        class="ma-2"
        color="success"
        :href="reportLink"
      >
        {{ $t('reports.download') }}
      </v-btn>
    </h1>

    <v-row>
      <v-col class="col-sm-2 col-6">
        <date-select
          v-model="filters.fromDate"
          :label="$t('reports.from_date')"
          :max="filters.toDate"
          :locale="user.locale"
        />
      </v-col>

      <v-col class="col-sm-2 col-6">
        <date-select
          v-model="filters.toDate"
          :label="$t('reports.to_date')"
          :min="filters.fromDate"
          :locale="user.locale"
        />
      </v-col>

      <v-col class="col-sm-2 col-6">
        <v-select
          v-model="quickDate"
          :items="quickDates"
          single-line
          :label="$t('reports.quick_date')"
        />
      </v-col>

      <v-col v-if="tags.length" class="col-sm-3 col-6">
        <v-select
          v-model="filters.tagsIds"
          :items="tags"
          item-text="name"
          item-value="id"
          item-key="id"
          :multiple="true"
          single-line
          :label="$t('reports.tags')"
        />
      </v-col>

      <v-col v-if="users.length" class="col-sm-3 col-6">
        <v-select
          v-model="filters.userId"
          :items="users"
          item-text="name"
          item-value="id"
          item-key="id"
          single-line
          :label="$t('reports.employee')"
        />
      </v-col>
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
            <td>{{ item.tasks[0].tags.join(", ") }}</td>
            <td>{{ item.tasks[0].spent_time }}</td>
            <td />
          </tr>
        </template>
        <template v-else>
          <tr>
            <td>{{ selectValueForMultipleRecords(item.tasks, 'project_name') }}</td>
            <td />
            <td>{{ selectValueForMultipleRecords(item.tasks, 'user_name') }}</td>
            <td><span class="multiple-records-font">{{ descriptionForMultipleRecords(item.tasks) }}</span></td>
            <td></td>
            <td>
              <span class="multiple-records-font">
                {{ totalTime(item.tasks) }}
              </span>
            </td>
            <td>
              <v-icon
                @click="expand(!isExpanded)"
              >
                mdi-chevron-{{ isExpanded ? "up" : "down" }}
              </v-icon>
            </td>
          </tr>
        </template>
      </template>
      <template v-slot:expanded-item="{ item }">
        <tr
          v-for="task in item.tasks"
          :key="task.id"
          class="blue lighten-5"
        >
          <template v-if="item.tasks.length > 1">
            <td>{{ task.project_name }}</td>
            <td nowrap>
              {{ task.assigned_date }}
            </td>
            <td>{{ task.user_name }}</td>
            <td class="expanded-item-description">
              {{ task.description }}
            </td>
            <td>{{ task.tags.join(", ") }}</td>
            <td>{{ task.spent_time }}</td>
            <td />
          </template>
        </tr>
      </template>
    </v-data-table>
    <h3 v-else>
      {{ $t('reports.no_records') }}
    </h3>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { DateTime } from 'luxon'
import dateSelect from '@/components/reports/date_select'

export default {

  head () {
    return {
      title: this.$t('page_titles.reports')
    }
  },

  components: {
    'date-select': dateSelect
  },

  data () {
    return {
      quickDate: null,
      reportLink: null,
      loadingReport: false,
      fromDateMenu: false,
      tasks: [],
      users: [],
      tags: [],
      totalAmount: 0.0,
      expanded: [],
      quickDates: [
        { value: 'this_week', text: this.$t('reports.this_week') },
        { value: 'last_week', text: this.$t('reports.last_week') },
        { value: 'this_month', text: this.$t('reports.this_month') },
        { value: 'last_month', text: this.$t('reports.last_month') }
      ],
      filters: {
        fromDate: null,
        toDate: null,
        userId: null,
        tagsIds: []
      }
    }
  },

  computed: {
    ...mapGetters(['isManager']),
    ...mapState(['user']),

    indexedItems () {
      return this.tasks.map((tasks, index) => ({
        id: index,
        tasks
      }))
    },

    headers () {
      return [
        { text: this.$t('reports.project'), value: 'project_name' },
        { text: this.$t('reports.date'), value: 'assigned_date' },
        { text: this.$t('reports.employee'), value: 'user_name' },
        { text: this.$t('reports.description'), value: 'description' },
        { text: this.$t('reports.tags'), value: 'tags' },
        { text: `${this.$t('reports.amount')}(${this.totalAmount})`, value: 'spent_time' },
        { text: '', value: 'expand', align: 'end' }
      ]
    }
  },

  watch: {
    filters: {
      handler () {
        if (this.filters.fromDate && this.filters.toDate) {
          this.getTasks()
        }
      },
      deep: true
    },

    quickDate () {
      const currentTime = DateTime.local()
      switch (this.quickDate) {
        case 'this_week':
          this.setDates('week', currentTime); break
        case 'last_week':
          this.setDates('week', currentTime.minus({ days: 7 })); break
        case 'this_month':
          this.setDates('month', currentTime); break
        case 'last_month':
          this.setDates('month', currentTime.minus({ month: 1 })); break
      }
    }
  },

  async mounted () {
    if (this.isManager) { 
      const response = await this.$api.getUsersByCurrentWorkspace()
      this.users = response.data
    }
    this.filters.userId = this.user.id
    this.fetchTags()
  },

  methods: {
    async getTasks () {
      this.reportLink = null
      const response = await this.$api.allTimeRecords(this.handledFilters())
      this.totalAmount = response.data.total_spent_time
      this.tasks = response.data.time_records
    },

    async fetchTags () {
      const response = await this.$api.allTags()
      this.tags = response.data
    },

    handledFilters () {
      return {
        fromDate: this.filters.fromDate,
        toDate: this.filters.toDate,
        userId: this.filters.userId || this.user.id,
        tagsIds: this.filters.tagsIds
      }
    },

    async getReportLink () {
      this.loadingReport = true
      const response = await this.$api.generateReport(this.handledFilters())
      this.reportLink = response.data.link
      this.loadingReport = false
    },

    setDates (interval, time) {
      this.filters.fromDate = time.startOf(interval).toFormat('yyyy-LL-dd')
      this.filters.toDate = time.endOf(interval).toFormat('yyyy-LL-dd')
    },

    totalTime (tasks) {
      const time = tasks.reduce((accumulator, task) => {
        return accumulator + task.spent_time
      }, 0)
      return parseFloat(time).toFixed(2)
    },

    selectValueForMultipleRecords (tasks, value) {
      const values = tasks.map((task) => {
        return task[value]
      })
      const uniqueValues = [...new Set(values)]
      if (uniqueValues.length > 1) {
        return uniqueValues.length
      } else {
        return uniqueValues[0]
      }
    },

    descriptionForMultipleRecords (tasks) {
      const number = tasks.length - 1
      return `${tasks[0].description.substring(0, 20)}... ${this.$tc('reports.more_tasks', number, { num: number })}`
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
