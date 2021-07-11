<template>
  <v-row class="main-content-container align-center">
    <v-col cols="2" class="clickable">
      <ProjectSelect :project="project" @update="updateAttribute($event, 'project')" />
    </v-col>
    <v-col cols="8" class="clickable">
      <div class="d-flex justify-end">
        <DescriptionInput
          placeholder="What are you working on?"
          :description="description"
          @update="updateAttribute($event, 'description')"
        />
        <TagsMenu :tagIds="tagIds" @update="updateAttribute($event, 'tagIds')" />
      </div>
    </v-col>
    <v-col>
      <TimeInput :spentTime="spentTime" @update="updateAttribute($event, 'spentTime')" />
    </v-col>
    <v-col v-if="activeDay">
      <div class="start-timer" v-if="!intervalId" @click="createAndStart">
        <v-icon>mdi-play-circle</v-icon>
        <span>Start</span>
      </div>


      <img class="clock-image" src="/clock.svg" alt="Stop Timer" v-if="intervalId" :text="true" @click="update(false)"/>
    </v-col>
    <v-col v-else>
      <div class="start-timer" @click="create">
        <v-icon>mdi-plus-circle</v-icon>
        <span>Add</span>
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
    ...mapState(['projects', 'currentTask', 'tasks', 'selectedDate', 'currentDate']),
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
    ...mapMutations([
      "updateTaskSpentTime",
      "keepActiveTaskIntervalId",
      "clearActiveTaskIntervalId",
    ]),

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
    width: 2rem;
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
</style>

<style>
  .main-content-container .v-input .v-input__slot {
    margin-bottom: 0px;
  }

  .main-content-container .v-messages {
    min-height: 0px;
  }
</style>
