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
        :label="$t('time_sheet.project')"
        :hide-selected="true"
        :disabled="active"
        @focus="selectPendingClass"
        @change="update()"
      ></v-select>
    </td>
    <td width="40%">
      <v-text-field
        v-model="description"
        :placeholder="$t('time_sheet.description')"
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
          <v-icon @click="dialog = true" :text="true" :large="true" :disabled="active">mdi-delete</v-icon>
        </v-col>
      </v-row>
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

      try{
        await this.updateTask(params)
        this.updateCounterOfPendingTasks(-1)
        this.rowClass = ""
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
    },

    deleteItem(){
      this.dialog = false
      this.deleteTask({ id: this.id })
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
