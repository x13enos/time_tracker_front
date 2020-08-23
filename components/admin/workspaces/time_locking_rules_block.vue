<template>
  <v-dialog
    @keydown.esc="dialog = false"
    v-model="dialog"
    persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <v-btn
            color="primary"
            fab
            x-small
            dark >
          <v-icon>mdi-book-lock</v-icon>
        </v-btn>
      </span>
    </template>
    <v-card>
      <v-card-title class='justify-space-between'>
        <span class="headline">{{ $t("workspaces.time_locking_rules") }}</span>
      </v-card-title>
      <v-card-text>
        <v-switch
          :disabled="loading"
          :loading="loading"
          v-model="weeklyPeriod"
          @change="handlePeriod(weeklyPeriod, 'weekly')"
          :label="$t('workspaces.weekly_time_lock')" />
        <v-switch
          :disabled="loading"
          :loading="loading"
          class="checkbox-margin-0"
          v-model="monthlyPeriod"
          @change="handlePeriod(monthlyPeriod, 'monthly')"
          :label="$t('workspaces.monthly_time_lock')" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">{{ $t("close") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {

    props: {
      workspace: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        loading: false,
        dialog: false,
        weeklyPeriod: false,
        monthlyPeriod: false,
        rules: []
      }
    },

    watch: {
      dialog: function(value) {
        if(value)
          this.fetchRules()
      }
    },

    methods: {
      handlePeriod(value, period){
        value ? this.create(period) : this.remove(period)
      },

      async fetchRules() {
        const response = await this.$api.getTimeLockingRulesByWorkspace({ workspace_id: this.workspace.id })
        if(response.data)
          this.rules = response.data
          this.monthlyPeriod = !!this.rules.find(r => r.period === 'monthly')
          this.weeklyPeriod = !!this.rules.find(r => r.period === 'weekly')

      },

      async create(period) {
        this.loading = true
        const response = await this.$api.createTimeLockingRule({
          workspace_id: this.workspace.id,
          period
        })
        if(response.data){
          this.rules.push(response.data)
        }
        this.loading = false
      },

      async remove(period) {
        this.loading = true
        const deletedRule = this.rules.find(r => r.period === period)
        const response = await this.$api.deleteTimeLockingRule(deletedRule.id)
        if(response.data){
          this.rules = this.rules.filter(rule => rule.id !== deletedRule.id)
        }
        this.loading = false
      }
    }

  }
</script>

<style>
  .checkbox-margin-0{
    margin-top: 0px;
  }
</style>
