<template>
  <div>
    <h1>
      {{ $t('workspaces.title') }}
      <workspace-form @processData="addNewWorkspace">
        <v-btn
          class="ma-2"
          color="success"
        >
        {{ $t('add') }}
        </v-btn>
      </workspace-form>
    </h1>

    <div v-if="workspaces.length">
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">{{ $t("workspaces.name") }}</th>
            <th class="text-left">{{ $t("workspaces.users") }}</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="workspace in workspaces" :key="workspace.id">
            <td>{{ workspace.name }}</td>
            <td>
              <users-block v-if="workspace.owner" :workspace="workspace"/>
            </td>
            <td align="right">
              <template v-if="workspace.owner">
                <workspace-form :workspace="workspace" @processData="updateWorkspaceData(workspace.id, $event)">
                  <v-btn
                    color="primary"
                    fab
                    x-small
                    dark>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </workspace-form>
                <time-locking-rules
                  v-if="$config.extensionEnabled"
                  :rules="timeLockingRules.filter(r => r.workspace_id === workspace.id)"
                  :workspace="workspace"
                  @addRule="addRule($event)"
                  @removeRule="removeRule($event)"/>
                <v-btn
                  color="error"
                  fab
                  x-small
                  dark
                  @click="markWorkspaceAsPendingDelete(workspace.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
    <h3 v-else>{{ $t('workspaces.no_workspaces') }}</h3>

    <v-dialog v-model="deleteDialog" max-width="450">
      <v-card>
        <v-card-title class="headline">{{ $t("are_you_sure") }}</v-card-title>
        <v-card-text>
          {{ $t("workspaces.approve_deleting") }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteWorkspace">
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
import WorkspaceForm from "@/components/admin/workspaces/form"
import UsersBlock from "@/components/admin/workspaces/users_block"
import TimeLockingRules from "@/components/admin/workspaces/time_locking_rules_block"
import { mapMutations, mapActions } from 'vuex'

export default {

  components: {
    "workspace-form": WorkspaceForm,
    "users-block": UsersBlock,
    "time-locking-rules": TimeLockingRules
  },

  data() {
    return {
      workspaces: [],
      timeLockingRules: [],
      deleteDialog: false,
      deletingWorkspaceId: null
    }
  },

  mounted(){
    this.fetchWorkspaces();
  },

  methods: {
    ...mapMutations(["updateSnack"]),
    ...mapActions(["deleteWorkspaceFromUserInfo"]),

    async fetchWorkspaces(){
      const response = await this.$api.allWorkspaces()
      if(response.data)
        this.workspaces = response.data
    },

    addNewWorkspace(data){
      this.workspaces.push(data)
    },

    updateWorkspaceData(id, data){
      const workspaceIndex = this.workspaces.findIndex(p => p.id === id )
      this.$set(this.workspaces, workspaceIndex, data)
    },

    markWorkspaceAsPendingDelete(id){
      this.deletingWorkspaceId = id
      this.deleteDialog = true
    },

    async deleteWorkspace(){
      this.deleteDialog = false
      const response = await this.$api.deleteWorkspace(this.deletingWorkspaceId)
      if(response.data){
        await this.deleteWorkspaceFromUserInfo(this.deletingWorkspaceId)
        this.updateSnack({ message: this.$t("workspaces.was_deleted"), color: "green" })
        const workspaceIndex = this.workspaces.findIndex(p => p.id === this.deletingWorkspaceId)
        this.$delete(this.workspaces, workspaceIndex)
      }
    },

    addRule(rule){
      this.timeLockingRules.push(rule)
    },

    removeRule(id){
      const ruleIndex = this.timeLockingRules.findIndex(r => r.id === id)
      this.$delete(this.timeLockingRules, ruleIndex)
    }
  }
}
</script>

<style>
</style>
