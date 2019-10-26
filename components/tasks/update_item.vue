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
        :disabled="active"
        @change="update"
      ></v-select>
    </td>
    <td width="40%">
      <v-text-field
        v-model="description"
        placeholder="description"
        :disabled="active"
        @blur="update"
      />
    </td>
    <td width="20%">
      <v-row>
        <v-col>
          <v-text-field
            v-model="spentTime"
            placeholder="0.0"
            :disabled="active"
            @blur="update"
          />
        </v-col>
        <v-col>
          <v-btn v-if="active" @click="stop">Stop</v-btn>
          <v-btn v-else @click="unpause">Continue</v-btn>
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
      default: () => { return {} },
      required: true
    },

    projects: {
      type: Array,
      default: () => { return [] },
      required: true
    }
  },

  data: function() {
    return {
      id: this.task.id,
      project: this.task.project,
      description: this.task.description,
      spentTime: this.task.spentTime,
      active: !this.$appMethods.isEmpty(this.task.timeStart),
      intervalId: null
    }
  },

  mounted: function(){
    if(this.active){
      this.updateSpentTime()
      this.start()
    }
  },

  methods: {
    async update(){
      this.$emit('updateTask', this.formData())
    },

    formData(){
      return {
        id: this.task.id,
        project: this.project,
        description: this.description || 0.0,
        spentTime: this.spentTime,
        active: this.active
      }
    },

    unpause(){
      this.active = true
      this.update()
      this.start()
    },

    start(){
      this.intervalId = setInterval(() => {
        this.spentTime = (parseFloat(this.spentTime) + parseFloat("0.01")).toFixed(2)
      }, 36000);
    },

    stop(){
      clearInterval(this.intervalId)
      this.active = false
      this.update()
    },

    updateSpentTime(){
      const secondsPassedFromStarting = ((new Date().getTime() / 1000) - (new Date(this.task.timeStart).getTime()))
      const timePassedFromStarting = Math.round((secondsPassedFromStarting / 3600) * 100) / 100
      this.spentTime = (parseFloat(this.spentTime) + parseFloat(timePassedFromStarting)).toFixed(2)
    }
  }
}
</script>
