<template>
  <v-row class="task-attributes mb-2">
    <v-col class="col-sm-2 col-12">
      <ProjectSelect :project="project"  @update="updateAttribute($event, 'project')" />
    </v-col>
    <v-col class="col-sm-8 col-12">
      <div class="d-flex justify-end">
        <DescriptionInput 
          :description="description" 
          @update="updateAttribute($event, 'description')" 
          @selectPendingClass="selectPendingClass"/>
        <TagsMenu 
          :tagIds="tagIds" 
          @update="updateAttribute($event, 'tagIds');"
          @selectPendingClass="selectPendingClass" />
      </div>
    </v-col>
    <v-col class="col-sm-1 col-6">
      <TimeInput :spentTime="this.spentTime" @update="updateAttribute($event, 'spentTime')" />
    </v-col>
    <div class="buttons d-flex align-center">
      <div class="start-timer mr-1" @click="create(false)">
        <v-icon>mdi-plus-circle</v-icon>
      </div>
      |
      <div v-if="activeDay" class="start-timer ml-1" @click="create(true)">
        <v-icon>mdi-play-circle</v-icon>
      </div>
    </div>
    <v-col class="col-12" v-if="!!errorMessages.base">
      <span class='red--text'>{{ errorMessages.base.join(", ") }}</span>
    </v-col>
  </v-row>
</template>

<script>
import formMixin from '@/mixins/form'

import { validationMixin } from 'vuelidate'
import { helpers } from 'vuelidate/lib/validators'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'

export default {
  mixins: [validationMixin, formMixin],

  components: {
    TagsMenu: () => import('@/components/tasks/inputs/tags_menu'),
    ProjectSelect: () => import('~/components/tasks/inputs/project_select.vue'),
    DescriptionInput: () => import('~/components/tasks/inputs/description.vue'),
    TimeInput: () => import('~/components/tasks/inputs/time.vue')
  },

  data: function() {
    return {
      rowClass: "",
      tagIds: [],
      project: null,
      description: null,
      spentTime: null,
      valid: false,
    }
  },

  validations() {
    return {
      spentTime: { spentTimeFormat }
    }
  },

  mounted: function(){
    this.selectOneProject()
  },

  computed: {
    ...mapState(["projects", "tags", "selectedDate"]),
    ...mapGetters(["activeDay"])
  },

  methods: {
    ...mapActions(["addTask"]),
    ...mapMutations([
      "updateSnack",
      "deletePendingTaskId",
      "addPendingTaskId"
    ]),
    

    async create(startTask) {
      try{
        this.errorMessages = []
        await this.addTask({ params: this.formData(startTask), day: this.selectedDate })
        this.removePendingState()
        this.cleanUpData();
        this.updateSnack({ message: this.$t("time_sheet.task_was_created"), color: "green" })
      } catch ({ errors }) {
        this.updateSnack({ message: this.$t("time_sheet.task_was_not_created"), color: "red" })
        this.errorMessages = errors
      }
    },

    cleanUpData () {
      Object.assign(this, {
        project: null,
        tagIds: [],
        description: null,
        spentTime: null
      })
    },

    selectPendingClass(){
      if(this.containsEmptyData()){
        this.removePendingState();
      } else {
        this.addPendingState();
      }
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

    containsEmptyData(){
      return (this.projects.length === 1 || this.$appMethods.isEmpty(this.project)) &&
        this.$appMethods.isEmpty(this.description) && this.$appMethods.isEmpty(this.tagIds)
    },

    selectOneProject(){
      if(this.projects.length == 1)
        this.project = this.projects[0].id
    },

    removePendingState(){
      this.deletePendingTaskId(this.internalId)
    },

    addPendingState(){
      if(this.$appMethods.isEmpty(this.rowClass)){
        this.addPendingTaskId(this.internalId)
      }
    },

    updateAttribute(value, attr) {
      this[attr] = value
    }
  }
}

const spentTimeFormat = (value) => {
  return !helpers.req(value) || /^[0-9]+(\.[0-9]{1,2})?$/gm.test(value);
};

</script>

<style scoped>
  .task-attributes{
    padding: 6px 0;
    background-color: white;
    border-radius: 5px;
  }

  .buttons {
    cursor: pointer;
  }
</style>
