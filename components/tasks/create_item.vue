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
        :disabled="dayIsBlocked"
        :label="$t('time_sheet.project')"
        @focus="selectPendingClass"
      ></v-select>
    </v-col>
    <v-col class="col-sm-8 col-12">
      <div class='d-flex justify-end'>
        <v-textarea
          v-model="description"
          :placeholder="$t('time_sheet.description')"
          autocomplete="off"
          rows="1"
          :auto-grow="true"
          :disabled="dayIsBlocked"
          @input="selectPendingClass"
        />
        <tags-menu
          :tagIds="tagIds"
          :disabled="dayIsBlocked"
          @updateTags="tagIds = $event; selectPendingClass()">
        </tags-menu>
      </div>
    </v-col>
    <v-col class="col-sm-1 col-6">
      <v-form v-model="valid">
        <v-text-field
          v-model="$v.spentTime.$model"
          placeholder="0.0"
          :disabled="doesNotReadyForAction"
          :error-messages="$formErrorMessage('spentTime', ['spentTimeFormat'])"
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
    <v-col class="col-12" v-if="!!errorMessages.base">
      <span class='red--text'>{{ errorMessages.base.join(", ") }}</span>
    </v-col>
  </v-row>
</template>

<script>
import formMixin from '@/mixins/form'

import TagsMenu from '@/components/tasks/tags_menu'
import { validationMixin } from 'vuelidate'
import { helpers } from 'vuelidate/lib/validators'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  mixins: [validationMixin, formMixin],

  components: {
    'tags-menu': TagsMenu
  },

  props: {
    day: {
      type: Object,
      required: true
    },

    activeDay: {
      type: Boolean,
      required: true
    },

    dayIsBlocked: {
      type: Boolean,
      required: true
    }
  },

  data: function() {
    return {
      rowClass: "",
      tagIds: [],
      project: null,
      description: null,
      spentTime: null,
      btnStartFocused: false,
      valid: false,
    }
  },

  validations() {
    return {
      spentTime: { spentTimeFormat }
    }
  },

  mounted: function(){
    this.selectOneProject()
  },

  computed: {
    ...mapState(["projects", "tags"]),

    selectedTags() {
      const tags = this.tags.filter((t) => this.tagIds.includes(t.id))
      return tags.map((t) => t.name).join(', ')
    },

    doesNotReadyForAction(){
      return this.$appMethods.isEmpty(this.project) ||
        this.$appMethods.isEmpty(this.description)  ||
        this.dayIsBlocked;
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
        this.errorMessages = []
        const response = await this.addTask({params: this.formData(), day: this.day })
        this.removePendingState();
        Object.assign(this, this.defaultData())
        this.selectOneProject()
        this.updateSnack({ message: this.$t("time_sheet.task_was_created"), color: "green" })
      } catch (errors){
        this.updateSnack({ message: this.$t("time_sheet.task_was_not_created"), color: "red" })
        this.errorMessages = errors
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
        spentTime: parseFloat(this.spentTime || 0.0).toFixed(2),
        active: this.btnStartFocused,
        tagIds: this.tagIds
      }
    },

    toggleBtnStatus(){
        this.btnStartFocused = !this.btnStartFocused
    },

    containsEmptyData(){
      return (this.projects.length === 1 || this.$appMethods.isEmpty(this.project)) &&
        this.$appMethods.isEmpty(this.description) && this.$appMethods.isEmpty(this.tagIds)
    },

    selectOneProject(){
      if(this.projects.length == 1)
        this.project = this.projects[0].id
    },

    defaultData(){
      return {
        rowClass: "",
        tagIds: [],
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

const spentTimeFormat = (value) => {
  return !helpers.req(value) || /^[0-9]+(\.[0-9]{1,2})?$/gm.test(value);
};

</script>
