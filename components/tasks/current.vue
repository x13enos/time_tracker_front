<template>
  <v-row class="main-content-container align-center">
    <v-col cols="2" class="clickable">
      <ProjectSelect :project="project" @update="updateAttribute($event, 'project')" />
    </v-col>
    <v-col cols="8" class="clickable">
      <div class="d-flex justify-end">
        <DescriptionInput
          :placeholder="$t('time_sheet.what_are_you_working_on')"
          :description="description"
          @update="updateAttribute($event, 'description')"
        />
        <TagsMenu :tagIds="tagIds" @update="updateAttribute($event, 'tagIds')" />
      </div>
    </v-col>
    <v-col>
      <TimeInput :spentTime="spentTime" @update="updateAttribute($event, 'spentTime')" />
    </v-col>
    <v-col v-if="activeDay || intervalId">
      <div class="start-timer" v-if="!intervalId" @click="createAndStart">
        <v-icon>mdi-play-circle</v-icon>
        <span>{{$t('time_sheet.start')}}</span>
      </div>
      <div v-else class="start-timer" @click="update(false)">
        <img
          class="clock-image v-icon" 
          src="/clock.svg" 
          alt="Stop Timer" 
          :text="true"/>
          <span>{{$t('time_sheet.stop')}}</span>
      </div>
    </v-col>
    <v-col v-else>
      <div class="start-timer" @click="create">
        <v-icon>mdi-plus-circle</v-icon>
        <span>{{$t('time_sheet.add')}}</span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'

export default {

  components: {
    TagsMenu: () => import('@/components/tasks/inputs/tags_menu'),
    ProjectSelect: () => import('~/components/tasks/inputs/project_select.vue'),
    DescriptionInput: () => import('~/components/tasks/inputs/description.vue'),
    TimeInput: () => import('~/components/tasks/inputs/time.vue')
  },

  data () {
    return {
      intervalId: null,
      project: null,
      tagIds: [],
      description: null,
      spentTime: null,
      assignedDate: null
    }
  },

  computed: {
    ...mapState(['projects', 'currentTask', 'tasks', 'selectedDate']),
    ...mapGetters(["activeDay"]),
  },

  watch: {
    currentTask(value) {
      if (value) {
        const { project, tagIds, description, assignedDate, spentTime } = value;
        Object.assign(this, {
          project,
          tagIds,
          description,
          assignedDate,
          spentTime: spentTime.toString()
        })
        this.start();
      } else {
        this.clearIntervalId();
        this.cleanUpData();
      }

    }
  },

  methods: {
    ...mapActions(['addTask', 'updateTask']),
    ...mapMutations(["updateTaskSpentTime"]),

    clearIntervalId () {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },

    async create () {
      await this.addTask({ params: this.formData(false), day: this.selectedDate })
      this.cleanUpData();
    },

    async createAndStart () {
      await this.addTask({ params: this.formData(true), day: this.selectedDate })
    },

    async update(active = undefined) {
      if (!this.currentTask) { return }

      const params = this.formData()
      params.id = this.currentTask.id;
      if (typeof active !== 'undefined')
        params.active = active

      await this.updateTask(params)
    },

    cleanUpData () {
      Object.assign(this, {
        project: null,
        tagIds: [],
        description: null,
        spentTime: null,
        assignedDate: null
      })
    },

    start(){
      const intervalId = setInterval(() => {
        this.spentTime = (parseFloat(this.spentTime) + parseFloat("0.01")).toFixed(2)
        this.updateTaskSpentTime(this.spentTime)
      }, 36000);
      this.intervalId = intervalId
    },

    formData (active) {
      return {
        project: this.project,
        description: this.description,
        spentTime: parseFloat(this.spentTime || 0.0).toFixed(2),
        active,
        tagIds: this.tagIds
      }
    },

    updateAttribute(value, attr) {
      this[attr] = value
      this.update()
    }
  }
}
</script>

<style scoped>
  .clock-image{
    width: 1.5rem;
    cursor: pointer;
    height: inherit;
    align-items: center;
  }

  .main-content-container {
    background-color: white;
    border-bottom: 1px solid #E0E0E0;
  }

  .start-timer {
    cursor: pointer;
  }

  .row {
    margin-top: 0;
  }
</style>

<style>
  .main-content-container .v-input .v-input__slot {
    margin-bottom: 0px;
  }

  .main-content-container .v-messages {
    min-height: 0px;
  }
</style>
