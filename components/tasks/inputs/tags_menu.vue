<template>
  <v-menu
    v-if="!$appMethods.isEmpty(tags)"
    v-model="menuOpened"
    content-class="tags-menu"
    :close-on-content-click="false"
    nudge-top="15"
    :disabled="disabled"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <div 
      class="tags d-flex justify-end align-center"
      :class="{ 'tags-selected': !$appMethods.isEmpty(tagIds) }"
      v-on="on">
        <div v-if="tagNames" class="multiple-tags lighten-5">
          {{ tagNames }}
        </div>
        <v-icon v-if="$appMethods.isEmpty(tagIds)">
          mdi-tag-multiple
        </v-icon>
      </div>
    </template>
    <v-container fluid>
      <v-checkbox
        v-for="tag in tags"
        :key="tag.id"
        v-model="selectedTags"
        class="tag-checkbox"
        :label="tag.name"
        selected="selected"
        :value="tag.id"
      />
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

  data () {
    return {
      menuOpened: false,
      selectedTags: this.tagIds
    }
  },

  computed: {
    ...mapState(['tags']),

    isChecked () {
      return value => this.selectedTags.includes(value)
    },

    tagNames () {
      const tags = this.tags.filter(t => this.tagIds.includes(t.id))
      return tags.map(t => t.name).join(', ')
    }
  },

  watch: {
    menuOpened (value) {
      if (!value) { this.$emit('update', this.selectedTags) }
    }
  }
}
</script>

<style scoped>
  .tags{
    margin-left: 10px;
    height: 1.5rem;
    max-width: 25%;
    cursor: pointer;
  }

  .tags-selected {
    background: rgba(102, 197, 182, 0.1);
  }

  .tags-menu {
    background-color: white;
  }

  .tag-checkbox {
    margin-top: 5px;
    padding-top: 5px;
  }

  .multiple-tags {
    font-size: 14px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #66C5B6;
    border-radius: 4px;
    padding: 0px 10px;
  }
</style>

<style>
  .tag-checkbox .v-messages {
    min-height: 0px;
  }
</style>
