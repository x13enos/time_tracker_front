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
        @focus="selectPendingClass"
      ></v-select>
    </td>
    <td width="40%">
      <v-text-field
        v-model="description"
        placeholder="description"
        @input="selectPendingClass"
      />
    </td>
    <td width="20%">
      <v-row>
        <v-col>
          <v-text-field
            v-model="spentTime"
            placeholder="0.0"
            :disabled="doesNotReadyForAction"
            @blur="onlyCreate"
          />
        </v-col>
        <v-col class="d-flex text-right">
          <v-icon
          @click="create"
          :text="true"
          :large="true"
          @mouseover="toggleBtnStatus"
          @mouseout="toggleBtnStatus"
          :disabled="doesNotReadyForAction || !this.activeDay">
            mdi-play-circle
          </v-icon>
        </v-col>
      </v-row>
    </td>
  </tr>
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
    return this.defaultData()
  },

  computed: {
    doesNotReadyForAction(){
      return this.$appMethods.isEmpty(this.project) ||
        this.$appMethods.isEmpty(this.description);
    },

    projects(){
      return this.$store.state.projects;
    }
  },

  methods: {
    ...mapActions(["addTask"]),
    ...mapMutations(["updateSnack", "updateCounterOfPendingTasks"]),

    onlyCreate(){
      if(!this.btnStartFocused)
        this.create()
    },

    async create(){
      const response = await this.addTask({params: this.formData(), day: this.day })
      if(response.success()){
        this.updateCounterOfPendingTasks(-1)
        Object.assign(this, this.defaultData())
      } else {
        this.updateSnack({ message: response.errors, color: "red" })
        this.rowClass = "red"
      }
    },

    selectPendingClass(){
      if(this.$appMethods.isEmpty(this.rowClass)){
        this.updateCounterOfPendingTasks(1)
        this.rowClass = "yellow lighten-3"
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

    defaultData(){
      return {
        rowClass: "",
        project: null,
        description: null,
        spentTime: null,
        btnStartFocused: false
      }
    }
  }
}
</script>
