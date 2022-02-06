<template>
  <div 
    class="tags d-flex justify-end align-center"
    :class="{ 'tags-selected': !$appMethods.isEmpty(tagIds) }">
    <MultipleSelect 
      :items="tagsOptions"
      v-model="selectedTags"
      title="Tags"
      addLink="Add Tag"
      @update="$emit('update', selectedTags)">
        <div v-if="tagNames" class="multiple-tags">
          {{ tagNames }}
        </div>
        <v-icon v-if="$appMethods.isEmpty(tagIds)">
          mdi-tag-multiple
        </v-icon>
    </MultipleSelect>
  </div>
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

  components: {
    MultipleSelect: () => import('~/components/shared/multiple_select.vue')
  },

  data () {
    return {
      selectedTags: this.tagIds
    }
  },

  computed: {
    ...mapState(['tags']),

    tagsOptions() {
      return this.tags.map(tag => { 
        return { name: tag.name, value: tag.id } 
      })
    },

    tagNames () {
      const tags = this.tags.filter(t => this.tagIds.includes(t.id))
      return tags.map(t => t.name).join(', ')
    }
  },

  watch: {
    tagIds (value) {
      if (!value.length) {
        this.selectedTags = [];
      }
    }
  }
}
</script>

<style>
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
