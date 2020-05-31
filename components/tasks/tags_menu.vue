<template>
  <v-menu
    content-class="tags-menu"
    :close-on-content-click="false"
    nudge-top="15"
    :disabled="disabled"
    v-model="menuOpened"
    offset-y>
      <template v-slot:activator="{ on }">
        <div v-on="on" class='tags d-flex justify-end'>
          <div v-if="tagNames" class='multiple-tags blue lighten-5'>
            {{ tagNames }}
          </div>
          <v-icon v-if="tagIds.length === 0">
            mdi-tag-multiple
          </v-icon>
        </div>
      </template>
      <v-container fluid>
        <v-checkbox
          v-model="selectedTags"
          class="tag-checkbox"
          v-for="tag in tags"
          :key="tag.id"
          :label="tag.name"
          selected="selected"
          :value="tag.id"
          @change="updateTags"/>
      </v-container>
    </v-menu>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    tagIds: {
      type: Array,
      required: true
    },

    disabled: {
      type: Boolean,
      required: false
    }
  },

  computed: {
    ...mapState(["tags"]),

    isChecked() {
      return value => this.selectedTags.includes(value)
    },

    tagNames() {
      const tags = this.tags.filter((t) => this.tagIds.includes(t.id))
      return tags.map((t) => t.name).join(', ')
    },
  },

  watch: {
    menuOpened(value){
      if(!value)
        this.$emit('change')
    }
  },

  data: function() {
    return {
      menuOpened: false,
      selectedTags: this.tagIds
    }
  },

  methods: {
    updateTags() {
      this.$emit("updateTags", this.selectedTags)
    }
  }
}
</script>

<style scoped>
  .tags{
    max-width: 20%;
    cursor: pointer;
  }

  .tags-menu {
    background-color: white;
  }

  .tag-checkbox {
    margin-top: 5px;
    padding-top: 5px;
  }

  .multiple-tags {
    margin: 25px 0 20px 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #02587f;
    border-radius: 4px;
    padding: 0px 10px;
  }
</style>

<style>
  .tag-checkbox .v-messages {
    min-height: 0px;
  }
</style>
