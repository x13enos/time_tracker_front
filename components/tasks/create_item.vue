<template>
  <tr :class="pendingClass">
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
            @blur="create"
          />
        </v-col>
        <v-col>
          <v-btn @click="createAndStart" :disabled="doesNotReadyForAction || !this.activeDay"> Start </v-btn>
        </v-col>
      </v-row>
    </td>
  </tr>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    day: {
      type: Date,
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

    createAndStart(){
      this.active = true
      this.create()
    },

    create(){
      this.addTask({params: this.formData(), day: this.day })
      Object.assign(this, this.defaultData())
    },

    selectPendingClass(){
      this.pendingClass = "yellow lighten-3"
    },

    formData(){
      return {
        project: this.project,
        description: this.description,
        spentTime: this.spentTime || 0.0,
        active: this.active
      }
    },

    defaultData(){
      return {
        pendingClass: "",
        project: null,
        description: null,
        spentTime: null,
        active: false
      }
    }
  }
}
</script>
