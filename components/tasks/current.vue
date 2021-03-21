<template>
  <v-container :fluid="true">
    <v-row>
      <v-col cols="2" class="clickable">
        <ProjectSelect :project="project" @update="updateAttribute($event, 'project')" />
      </v-col>
      <v-col cols="8" class="clickable">
        <div class="d-flex justify-end">
          <DescriptionInput :description="description" @update="updateAttribute($event, 'description')" />
          <TagsMenu :tagIds="tagIds" @update="updateAttribute($event, 'tagIds')" />
        </div>
      </v-col>
      <v-col>
        <TimeInput :spentTime="spentTime" @update="updateAttribute($event, 'spentTime')" />
      </v-col>
      <v-col>
        <v-icon v-if="!intervalId" @click="create">
          mdi-play-circle
        </v-icon>

        <img class="clock-image" src="/clock.svg" alt="Stop Timer" v-if="intervalId" :text="true" @click="update(false)"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {

  components: {
    TagsMenu: () => import('@/components/tasks/inputs/tags_menu'),
    ProjectSelect: () => import('~/components/tasks/inputs/project_select.vue'),
    DescriptionInput: () => import('~/components/tasks/inputs/description.vue'),
    TimeInput: () => import('~/components/tasks/inputs/time.vue')
  },

  props: {
    day: {
      type: Object,
      required: true
    }
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
    ...mapState(['projects', 'currentTask', 'tasks'])
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
        Object.assign(this, {
          project: null,
          tagIds: [],
          description: null,
          spentTime: null,
          assignedDate: null
        })
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
      await this.addTask({ params: this.formData(true), day: this.day })
    },

    async update(active = undefined) {
      if (!this.currentTask) { return }

      const params = this.formData()
      params.id = this.currentTask.id;
      if (typeof active !== 'undefined')
        params.active = active

      await this.updateTask(params)
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
</style>
