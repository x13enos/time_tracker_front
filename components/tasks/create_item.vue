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
      ></v-select>
    </td>
    <td width="40%">
      <v-text-field
        v-model="description"
        placeholder="description"
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
          <v-btn @click="createAndStart" :disabled="doesNotReadyForAction"> Start </v-btn>
        </v-col>
      </v-row>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    projects: {
      type: Array,
      default: () => { return [] },
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
    }
  },

  methods: {
    createAndStart(){
      this.active = true
      this.create()
    },

    async create(){
      await this.$emit('addTask', this.formData())
      Object.assign(this, this.defaultData())
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
        project: null,
        description: null,
        spentTime: null,
        active: false
      }
    }
  }
}
</script>
