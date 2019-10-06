<template>
  <tr>
    <td width="50%">
      <v-select
        v-model="project"
        :items="projects"
        item-text="name"
        item-value="id"
        item-key="id"
        single-line
        label="Project"
        @change="updateTask"
      ></v-select>
    </td>
    <td width="40%">
      <v-text-field
        v-model="description"
        placeholder="description"
        @blur="updateTask"
      />
    </td>
    <td width="10%">
      <v-row>
        <v-col>
          <v-text-field
            v-model="time"
            placeholder="0.0"
            :disabled="doesNotReadyForAction"
            @blur="[newObject ? createTask : updateTask]"
          />
        </v-col>
        <v-col>
          <v-btn @click="[newObject ? createTask : updateTask]" :disabled="doesNotReadyForAction"> Start </v-btn>
        </v-col>
      </v-row>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: {}
    },

    projects: {
      type: Array,
      default: []
    }
  },

  data: function() {
    return {
      project: this.task.project,
      description: this.task.description,
      time: this.task.time
    }
  },

  computed: {
    doesNotReadyForAction(){
      return this.isEmpty(this.project) || this.isEmpty(this.description);
    },

    newObject(){
      return this.isEmpty(this.task.id);
    }
  },

  methods: {
    createTask(){
    },

    updateTask(){
    },

    isEmpty(val){
      return (val === undefined || val == null || val.length <= 0) ? true : false;
    }
  }
}
</script>
