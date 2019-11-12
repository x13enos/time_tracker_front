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
        :disabled="active"
        @focus="selectPendingClass"
        @change="update()"
      ></v-select>
    </td>
    <td width="40%">
      <v-text-field
        v-model="description"
        placeholder="description"
        @input="selectPendingClass"
        :disabled="active"
        @blur="update()"
      />
    </td>
    <td width="20%">
      <v-row>
        <v-col>
          <v-text-field
            v-model="spentTime"
            placeholder="0.0"
            :disabled="active"
            @input="selectPendingClass"
            @blur="update()"
          />
        </v-col>
        <v-col>
          <v-btn v-if="active" @click="stop">Stop</v-btn>
          <v-btn v-else @click="update(true)" :disabled="!activeDay">Continue</v-btn>
          <v-btn @click="deleteTask" :disabled="active">Del</v-btn>
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

    activeDay: {
      type: Boolean,
      required: true
    }
  },

  data: function() {
    return {
      pendingClass: "",
      id: this.task.id,
      project: this.task.project,
      description: this.task.description,
      spentTime: this.task.spentTime,
      intervalId: null
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
    async update(state=false){
      const params = this.formData()
      params.active = state
      await this.$emit('updateTask', params)
      this.pendingClass = ""
    },

    deleteTask(){
      this.$emit('deleteTask')
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
        this.$emit("updateSpentTime", parseFloat(this.spentTime))
      }, 36000);
      this.$emit("keepIntervalId", intervalId)
    },

    stop(){
      this.$emit("clearIntervalId")
      this.update()
    },

    selectPendingClass(){
      this.pendingClass = "yellow lighten-3"
    }
  }
}
</script>
