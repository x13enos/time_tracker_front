<template>
  <tr>
    <td width="40%">
      <v-select
        v-model="project"
        :items="projects"
        item-text="name"
        item-value="id"
        item-key="id"
        single-line
        label="Project"
        @change="update"
      ></v-select>
    </td>
    <td width="40%">
      <v-text-field
        v-model="description"
        placeholder="description"
        @blur="update"
      />
    </td>
    <td width="20%">
      <v-row>
        <v-col>
          <v-text-field
            v-model="spentTime"
            placeholder="0.0"
            @blur="update"
          />
        </v-col>
        <v-col>
          <v-btn @click="update">Start</v-btn>
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
      default: () => { return {} }
    },

    projects: {
      type: Array,
      default: () => { return [] }
    }
  },

  data: function() {
    return {
      id: this.task.id,
      project: this.task.project,
      description: this.task.description,
      spentTime: this.task.spentTime,
      timeStart: this.task.timeStart,
      active: this.isEmpty(this.task.timeStart) || false
    }
  },

  methods: {
    async update(){
      this.$emit('updateTask', this.formData())
    },

    isEmpty(val){
      return (val === undefined || val == null || val.length <= 0) ? true : false;
    },

    formData(){
      return {
        id: this.task.id,
        project: this.project,
        description: this.description || 0.0,
        spentTime: this.spentTime,
        active: this.active
      }
    }
  }
}
</script>
