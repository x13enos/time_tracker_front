<template>
  <div>
    <h1 class="row main-content-container title-block mt-1">
      {{ $t('tags.title') }}
      <tag-form @processData="addNewTag">
        <v-btn
          class="ma-2"
          color="success"
        >
        {{ $t('add') }}
        </v-btn>
      </tag-form>
    </h1>

    <div v-if="tags.length" class="mt-8">
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">{{ $t("tags.name") }}</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tag in tags" :key="tag.id">
            <td>{{ tag.name }}</td>
            <td align="right">
              <tag-form :tag="tag" @processData="updateTagData(tag.id, $event)">
                <v-btn
                  color="primary"
                  fab
                  x-small
                  dark>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </tag-form>
              <v-btn
                color="error"
                fab
                x-small
                dark
                @click="markTagAsPendingDelete(tag.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
    <h3 v-if="!isLoading && !tags.length">{{ $t('tags.no_tags') }}</h3>

    <v-dialog v-model="deleteDialog" max-width="450">
      <v-card>
        <v-card-title class="headline">{{ $t("are_you_sure") }}</v-card-title>
        <v-card-text>
          {{ $t("tags.approve_deleting") }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteTag">
            {{ $t("yes") }}
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteDialog = false">
            {{ $t("cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TagForm from "@/components/admin/tags/form"
import { mapMutations } from 'vuex'

export default {

  head() {
    return {
      title: this.$t('page_titles.tags')
    }
  },

  components: {
    "tag-form": TagForm
  },

  data() {
    return {
      tags: [],
      deleteDialog: false,
      deletingTagId: null,
      isLoading: true
    }
  },

  async mounted(){
    const response = await this.$api.allTags()
    if(response.data)
      this.tags = response.data

    this.isLoading = false
  },

  methods: {
    ...mapMutations(["updateSnack"]),

    addNewTag(data){
      this.tags.push(data)
    },

    updateTagData(id, data){
      const tagIndex = this.tags.findIndex(p => p.id === id )
      this.$set(this.tags, tagIndex, data)
    },

    markTagAsPendingDelete(id){
      this.deletingTagId = id
      this.deleteDialog = true
    },

    async deleteTag(){
      this.deleteDialog = false
      const response = await this.$api.deleteTag(this.deletingTagId)
      if(response.data){
        this.updateSnack({ message: this.$t("tags.was_deleted"), color: "green" })
        const tagIndex = this.tags.findIndex(p => p.id === this.deletingTagId)
        this.$delete(this.tags, tagIndex)
      }
    }
  }
}
</script>
