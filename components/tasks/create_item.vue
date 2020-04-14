<template>
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
        @focus="selectPendingClass"
      ></v-select>
    </v-col>
    <v-col class="col-sm-8 col-12">
      <v-textarea
        v-model="description"
        :placeholder="$t('time_sheet.description')"
        autocomplete="off"
        rows="1"
        :auto-grow="true"
        @input="selectPendingClass"
      />
    </v-col>
    <v-col class="col-sm-1 col-6">
      <v-form v-model="valid">
        <v-text-field
          v-model="spentTime"
          placeholder="0.0"
          :disabled="doesNotReadyForAction"
          :rules="spentTimeRules"
          @blur="onlyCreate"
        />
      </v-form>
    </v-col>
    <v-col class="col-sm-1 col-6">
      <v-icon
      @click="create"
      :text="true"
      :large="true"
      @mouseover="toggleBtnStatus"
      @mouseout="toggleBtnStatus"
      :disabled="doesNotReadyForAction || !this.activeDay || !valid">
        mdi-play-circle
      </v-icon>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  props: {
    day: {
      type: Object,
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
      project: null,
      description: null,
      spentTime: null,
      btnStartFocused: false,
      valid: true,
      spentTimeRules: [
        v => (v === null || /^[0-9]+(\.[0-9]{1,2})?$/gm.test(v)) ||
          `${this.$t('validations.should_has_format')} "0.00"`,
      ],
    }
  },

  mounted: function(){
    this.selectOneProject()
  },

  computed: {
    doesNotReadyForAction(){
      return this.$appMethods.isEmpty(this.project) ||
        this.$appMethods.isEmpty(this.description);
    },

    projects(){
      return this.$store.state.projects;
    },

    internalId(){
      return `f${(~~(Math.random()*1e8)).toString(16)}`;
    }
  },

  methods: {
    ...mapActions(["addTask"]),
    ...mapMutations([
      "updateSnack",
      "updateCounterOfPendingTasks",
      "addPendingTaskId",
      "deletePendingTaskId"
    ]),

    onlyCreate(){
      if(!this.btnStartFocused && this.valid)
        this.create()
    },

    async create(){
      try {
        const response = await this.addTask({params: this.formData(), day: this.day })
        this.removePendingState();
        Object.assign(this, this.defaultData())
        this.selectOneProject()
      } catch (error){
        this.rowClass = "red"
      }
    },

    selectPendingClass(){
      if(this.containsEmptyData()){
        this.removePendingState();
      } else {
        this.addPendingState();
      }
    },

    formData(){
      return {
        project: this.project,
        description: this.description,
        spentTime: this.spentTime || 0.0,
        active: this.btnStartFocused
      }
    },

    toggleBtnStatus(){
        this.btnStartFocused = !this.btnStartFocused
    },

    containsEmptyData(){
      return (this.projects.length === 1 || this.$appMethods.isEmpty(this.project)) &&
        this.$appMethods.isEmpty(this.description)
    },

    selectOneProject(){
      if(this.projects.length == 1)
        this.project = this.projects[0].id
    },

    defaultData(){
      return {
        rowClass: "",
        project: null,
        description: null,
        spentTime: null,
        btnStartFocused: false
      }
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
    }
  }
}
</script>
