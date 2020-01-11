<template>
  <tr :class="rowClass">
    <td width="40%">
      <v-select
        v-model="project"
        :items="projects"
        item-text="name"
        item-value="id"
        item-key="id"
        single-line
        label="Project"
        :disabled="active"
        @focus="selectPendingClass"
        @change="update()"
      ></v-select>
    </td>
    <td width="40%">
      <v-text-field
        v-model="description"
        placeholder="description"
        autocomplete="off"
        @input="selectPendingClass"
        :disabled="active"
        @blur="update()"
      />
    </td>
    <td width="20%">
      <v-row>
        <v-col>
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
        <v-col class="d-flex text-right">
          <img class="clock-image" src="/clock.svg" alt="Stop Timer" v-if="active" :text="true" @click="stop"/>
          <v-icon v-else @click="update(true)" :text="true" :large="true" :disabled="!activeDay || !valid">mdi-play-circle</v-icon>
          <v-icon @click="deleteTask({ id })" :text="true" :large="true" :disabled="active">mdi-delete</v-icon>
        </v-col>
      </v-row>
    </td>
  </tr>
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
      spentTimeRules: [
        v => (v === null || /^[0-9]+(\.[0-9]{1,2})?$/gm.test(v)) || 'should has format "0.00"',
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
      "updateCounterOfPendingTasks"
    ]),

    async update(state=false){
      if(!this.valid)
        return
      const params = this.formData()
      params.active = state
      const response = await this.updateTask(params)

      if(response.success()){
        this.updateCounterOfPendingTasks(-1)
        this.rowClass = ""
      } else {
        this.updateSnack({ message: response.errors, color: "red" })
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
        this.updateTaskSpentTime({ spentTime: parseFloat(this.spentTime), id: this.id })
      }, 36000);
      this.keepActiveTaskIntervalId(intervalId)
    },

    stop(){
      this.clearActiveTaskIntervalId()
      this.update()
    },

    selectPendingClass(){
      if(this.$appMethods.isEmpty(this.rowClass)){
        this.updateCounterOfPendingTasks(1)
        this.rowClass = "yellow lighten-3"
      }
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
