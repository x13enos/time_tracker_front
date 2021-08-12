<template>
  <div>
    <v-row class="d-none d-sm-flex subtitle-2 titles">
      <v-col cols="2">
        {{ $t("time_sheet.project") }}
      </v-col>
      <v-col cols="8">
        {{ $t("time_sheet.description") }}
      </v-col>
      <v-col cols="1" class='text-center'>
        {{ $t("time_sheet.time") }}
      </v-col>
      <!-- <v-col cols="1" class="text-right">
        {{ $t("time_sheet.total") }}: {{ totalTimeOfDailyTasks(selectedDate) }}
      </v-col> -->
    </v-row>
    <task
      v-for="task in dailyTasks" :key="task.id"
      :task="task"
      :dayIsBlocked="dayIsBlocked(selectedDate)"
      @keepIntervalId="keepIntervalId($event, intervalId)"
      @clearIntervalId="clearIntervalId"
    />
    <v-row 
      class="add-task-block mb-2 font-green"
      v-if="!showNewTask" 
      @click="showNewTask = true">
      <v-col class="col-sm-2 col-12">
        <div>
          <v-icon
            small
            class="add-icon font-green "
            v-if="!showNewTask" 
            @click="showNewTask = true">
            mdi-plus
          </v-icon>
          Add
        </div>
      </v-col>
    </v-row>
    <new-task v-if="showNewTask" />
  </div>
</template>

<script>
import UpdateItem from '~/components/tasks/update_item.vue';
import CreateItem from '~/components/tasks/create_item.vue';
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    "task": UpdateItem,
    "new-task": CreateItem
  },

  data: function() {
    return {
      intervalId: null,
      showNewTask: false
    }
  },

  watch: {
    selectedDate: function () {
      this.showNewTask = false;
    }
  },

  computed: {
    ...mapState(["tasks", 'selectedDate', 'currentDate']),
    ...mapGetters(["totalTimeOfDailyTasks", "dayIsBlocked"]),

    dailyTasks(){
      const tasks = this.tasks[this.$appMethods.systemFormatDate(this.selectedDate)] || {}
      return Object.values(tasks).filter(t => !t.timeStart )
    }
  },

  methods: {
    keepIntervalId(intervalId){
      this.intervalId = intervalId
    },

    clearIntervalId(){
      clearInterval(this.intervalId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .titles {
    color: #828282;

    .col {
      margin-top: 0.6rem;
      padding-bottom: 0.2rem;
    }
  }

  .add-task-block {
    cursor:pointer;
    padding: 6px 0;
    background-color: #FAFAFA;
    border-radius: 5px;
    border: 1px dashed #66C5B6;
    box-sizing: border-box;
  }
</style>
