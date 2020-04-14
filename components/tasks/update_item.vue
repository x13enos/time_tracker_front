<template>
  <div>
    <v-row justify="center" align="center" :class="rowClass">
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
          @change="update()"
        ></v-select>
      </v-col>
      <v-col class="col-sm-8 col-12">
        <v-textarea
          v-model="description"
          :placeholder="$t('time_sheet.description')"
          autocomplete="off"
          @input="selectPendingClass"
          :disabled="active"
          rows="1"
          :auto-grow="true"
          @blur="update()"
        />
      </v-col>
      <v-col class="col-sm-1 col-6">
        <v-form v-model="valid">
          <v-text-field
            v-model="spentTime"
            placeholder="0.0"
            :disabled="active"
            @input="selectPendingClass"
            :rules="spentTimeRules"
            @blur="update()"
          />
        </v-form>
      </v-col>
      <v-col class="col-sm-1 col-6">
        <v-row>
          <v-col cols="6">
            <img class="clock-image" src="/clock.svg" alt="Stop Timer" v-if="active" :text="true" @click="stop"/>
            <v-icon v-else @click="update(true)" :text="true" :large="true" :disabled="!activeDay || !valid">mdi-play-circle</v-icon>
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
import { mapActions, mapMutations } from 'vuex'

export default {

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

  data: function() {
    return {
      rowClass: "",
      id: this.task.id,
      project: this.task.project,
      description: this.task.description,
      spentTime: this.task.spentTime,
      intervalId: null,
      valid: true,
      dialog: false,
      spentTimeRules: [
        v => (v === null || /^[0-9]+(\.[0-9]{1,2})?$/gm.test(v)) ||
          `${this.$t('validations.should_has_format')} "0.00"`,
      ]
    }
  },

  mounted: function(){
    if(this.active){
      this.start()
    }
  },

  computed: {
    projects(){
      return this.$store.state.projects;
    },

    active(){
      return !this.$appMethods.isEmpty(this.task.timeStart)
    },

    internalId(){
      return `f${(~~(Math.random()*1e8)).toString(16)}`;
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
      "updateCounterOfPendingTasks",
      "deletePendingTaskId",
      "addPendingTaskId"
    ]),

    async update(state=false){
      if(!this.valid)
        return

      const params = this.formData()
      params.active = state

      try{
        await this.updateTask(params)
        this.removePendingState();
      } catch (error) {
        this.rowClass = "red"
      }
    },

    formData(){
      return {
        id: this.task.id,
        project: this.project,
        description: this.description,
        spentTime: this.spentTime || 0.0
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
      return ["project", "description", "spentTime"].every((attr) => {
        return this.task[attr] === this[attr]
      })
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

    deleteItem(){
      this.dialog = false
      this.deleteTask({
        assignedDate: this.task.assignedDate,
        id: this.id
      })
    }
  }
}
</script>

<style>
  .clock-image{
    width: 2.25rem;
    cursor: pointer;
    height: inherit;
    align-items: center;
  }
</style>
