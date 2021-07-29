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
      <TimeInput :spentTime="formattedSpentTime" @update="updateAttribute($event, 'spentTime')" />
    </v-col>
    <v-col class="col-sm-1 col-6">
      <img class="clock-image" src="/circle-loader.svg" alt="loader" v-if="loading" :text="true"/>
      <img class="clock-image" src="/clock.svg" alt="Stop Timer" v-if="active" :text="true" @click="stop"/>
      <v-icon
        v-if="!active && !loading"
        @click="launchTask"
        @mouseover="toggleBtnStatus"
        @mouseout="toggleBtnStatus"
        :disabled="!activeDay || !valid || dayIsBlocked">mdi-play-circle</v-icon>
      <v-menu v-if="!dayIsBlocked" offset-y>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" :disabled="active">mdi-dots-vertical</v-icon>
        </template>
        <v-list>
          <v-list-item @click="dialog = true">
            <v-icon>mdi-delete</v-icon>
            {{ $t("time_sheet.remove") }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>

    <v-col class="col-12" v-if="!!errorMessages.base">
      <span class='red--text'>{{ errorMessages.base.join(", ") }}</span>
    </v-col>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{ $t("are_you_sure") }}</v-card-title>
        <v-card-text>
          {{ $t("time_sheet.approve_deleting") }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteItem">
            {{ $t("yes") }}
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            {{ $t("cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

  props: {
    task: {
      type: Object,
      default: () => { return {} },
      required: true
    },

    dayIsBlocked: {
      type: Boolean,
      required: true
    }
  },

  validations() {
    return {
      spentTime: { spentTimeFormat }
    }
  },

  data: function() {
    return {
      rowClass: "",
      id: this.task.id,
      project: this.task.project,
      description: this.task.description,
      spentTime: this.task.spentTime,
      tagIds: this.task.tagIds,
      intervalId: null,
      valid: true,
      dialog: false,
      btnStartFocused: false,
      loading: false,
      cachedSpentTime: this.task.spentTime
    }
  },

  mounted: function(){
    if(this.active){
      this.start()
    }
  },

  computed: {
    ...mapState(["projects", "activeTaskIntervalId"]),
    ...mapGetters(["activeDay"]),

    active(){
      return !this.$appMethods.isEmpty(this.task.timeStart)
    },

    internalId(){
      return `f${(~~(Math.random()*1e8)).toString(16)}`;
    },

    formattedSpentTime() {
      if(this.spentTime)
        return this.spentTime.toString();
      else
        return '0.00';
    }
  },

  watch: {
    active: function(value){
      if(value)
        this.start()
    }
  },

  methods: {
    ...mapActions([
      "updateTask",
      "deleteTask"
    ]),
    ...mapMutations([
      "updateTaskSpentTime",
      "keepActiveTaskIntervalId",
      "clearActiveTaskIntervalId",
      "updateSnack",
      "deletePendingTaskId",
      "addPendingTaskId"
    ]),

    onlyUpdate(){
      if(!this.btnStartFocused && this.valid && !this.taskHasTheSameAttributes())
        this.update()
    },

    async update(launch=undefined){
      if(!this.valid)
        return

      const params = this.formData()
      if(typeof launch !== 'undefined')
        params.active = launch

      try{
        this.errorMessages = []
        await this.updateTask(params)
        this.removePendingState()
        this.updateSnack({ message: this.$t("time_sheet.task_was_updated"), color: "green" })
      } catch (errors) {
        this.updateSnack({ message: this.$t("time_sheet.task_was_not_updated"), color: "red" })
        this.errorMessages = errors
      }
    },

    formData(){
      return {
        id: this.task.id,
        project: this.project,
        description: this.description,
        spentTime: parseFloat(this.spentTime || 0.0).toFixed(2),
        tagIds: this.tagIds
      }
    },

    launchTask() {
      const delay = this.activeTaskIntervalId === null ? 0 : 500;
      this.loading = true;
      setTimeout(async () => {
        await this.update(true);
        this.loading = false;
      }, delay)
    },

    start(){
      const intervalId = setInterval(() => {
        this.spentTime = (parseFloat(this.spentTime) + parseFloat("0.01")).toFixed(2)
        this.updateTaskSpentTime({
          assignedDate: this.task.assignedDate,
          spentTime: parseFloat(this.spentTime),
          id: this.id })
      }, 36000);
      this.keepActiveTaskIntervalId(intervalId)
      this.btnStartFocused = false
    },

    stop(){
      this.clearActiveTaskIntervalId()
      this.update(false)
    },

    selectPendingClass(){
      if(this.taskHasTheSameAttributes()){
        this.removePendingState();
      } else {
        this.addPendingState();
      }
    },

    taskHasTheSameAttributes(){
      const tagsIdsEqual = this.task.tagIds.every( e => this.tagIds.includes(e)) && this.task.tagIds.length === this.tagIds.length;
      const spentTimeIsTheSame = this.task["spentTime"].toString() === this["spentTime"].toString();
      return ["project", "description"].every((attr) => {
        return this.task[attr] === this[attr]
      }) && tagsIdsEqual && spentTimeIsTheSame;
    },

    removePendingState(){
      this.deletePendingTaskId(this.internalId)
      this.rowClass = ""
    },

    addPendingState(){
      if(this.$appMethods.isEmpty(this.rowClass)){
        this.addPendingTaskId(this.internalId)
        this.rowClass = "yellow lighten-3"
      }
    },

    toggleBtnStatus(){
      this.btnStartFocused = !this.btnStartFocused
    },

    deleteItem(){
      this.dialog = false
      this.deleteTask({
        assignedDate: this.task.assignedDate,
        id: this.id
      })
    },

    updateAttribute(value, attr) {
      this[attr] = value
      this.onlyUpdate()
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

  .clock-image{
    width: 2.25rem;
    cursor: pointer;
    height: inherit;
    align-items: center;
  }
</style>
