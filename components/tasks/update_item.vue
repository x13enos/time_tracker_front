<template>
  <div>
    <v-row justify="center" align="center" :class="stateClass">
      <v-col class="col-sm-2 col-12">
        <span v-if="projects.length == 1">
          {{ projects[0].name }}
        </span>
        <v-select
          v-else
          v-model="project"
          :items="projects"
          item-text="name"
          item-value="id"
          item-key="id"
          single-line
          :label="$t('time_sheet.project')"
          :hide-selected="true"
          :disabled="active"
          @focus="selectPendingClass"
          @change="onlyUpdate()"
        ></v-select>
      </v-col>
      <v-col class="col-sm-8 col-12">
        <div class='d-flex justify-end'>
          <v-textarea
            v-model="description"
            :placeholder="$t('time_sheet.description')"
            autocomplete="off"
            @input="selectPendingClass"
            :disabled="active"
            rows="1"
            :auto-grow="true"
            @blur="onlyUpdate()"
          />
          <tags-menu
            :tagIds="tagIds"
            @updateTags="tagIds = $event; selectPendingClass()"
            @change="onlyUpdate()">
          </tags-menu>
        </div>
      </v-col>
      <v-col class="col-sm-1 col-6">
        <v-form v-model="valid">
          <v-text-field
            v-model="$v.spentTime.$model"
            placeholder="0.0"
            :disabled="active"
            @input="selectPendingClass"
            :error-messages="$formErrorMessage('spentTime', ['spentTimeFormat'])"
            @blur="onlyUpdate()"
          />
        </v-form>
      </v-col>
      <v-col class="col-sm-1 col-6">
        <v-row>
          <v-col cols="6">
            <img class="clock-image" src="/clock.svg" alt="Stop Timer" v-if="active" :text="true" @click="stop"/>
            <v-icon
              v-else
              @click="update(true)"
              :text="true"
              :large="true"
              @mouseover="toggleBtnStatus"
              @mouseout="toggleBtnStatus"
              :disabled="!activeDay || !valid">mdi-play-circle</v-icon>
          </v-col>
          <v-col cols="6">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" :large="true" :text="true" :disabled="active">mdi-dots-vertical</v-icon>
              </template>
              <v-list>
                <v-list-item @click="dialog = true">
                  <v-icon>mdi-delete</v-icon>
                  {{ $t("time_sheet.remove") }}
                </v-list-item>
              </v-list>
            </v-menu>

          </v-col>
        </v-row>
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
    <v-divider />
  </div>
</template>

<script>
import formMixin from '@/mixins/form'

import TagsMenu from '@/components/tasks/tags_menu'
import { validationMixin } from 'vuelidate'
import { helpers } from 'vuelidate/lib/validators'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  mixins: [validationMixin, formMixin],

  components: {
    'tags-menu': TagsMenu
  },

  props: {
    task: {
      type: Object,
      default: () => { return {} },
      required: true
    },

    activeDay: {
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
      cachedSpentTime: this.task.spentTime
    }
  },

  mounted: function(){
    if(this.active){
      this.start()
    }
  },

  computed: {
    ...mapState(["projects"]),

    active(){
      return !this.$appMethods.isEmpty(this.task.timeStart)
    },

    internalId(){
      return `f${(~~(Math.random()*1e8)).toString(16)}`;
    },

    stateClass() {
      return this.active ? "amber lighten-3" : this.rowClass
    }
  },

  watch: {
    active: function(value){
      this.btnStartFocused = value
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
      "updateCounterOfPendingTasks",
      "deletePendingTaskId",
      "addPendingTaskId"
    ]),

    onlyUpdate(){
      if(!this.btnStartFocused && this.valid)
        this.update()
    },

    async update(state=false){
      if(!this.valid)
        return

      const params = this.formData()
      params.active = state

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
        spentTime: this.spentTime || 0.0,
        tagIds: this.tagIds
      }
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
    },

    stop(){
      this.clearActiveTaskIntervalId()
      this.update()
    },

    selectPendingClass(){
      if(this.taskHasTheSameAttributes()){
        this.removePendingState();
      } else {
        this.addPendingState();
      }
    },

    taskHasTheSameAttributes(){
      const tagsIdsEqual = this.task.tagIds.every( e => this.tagIds.includes(e)) && this.task.tagIds.length === this.tagIds.length
      return ["project", "description", "spentTime"].every((attr) => {
        return this.task[attr] === this[attr]
      }) && tagsIdsEqual
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
    }
  }

}

const spentTimeFormat = (value) => {
  return !helpers.req(value) || /^[0-9]+(\.[0-9]{1,2})?$/gm.test(value);
};

</script>

<style scoped>
  .clock-image{
    width: 2.25rem;
    cursor: pointer;
    height: inherit;
    align-items: center;
  }
</style>
