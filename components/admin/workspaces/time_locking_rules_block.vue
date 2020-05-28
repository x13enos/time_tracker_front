<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
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
      },

      rules: {
        type: Array,
        required: true
      }
    },

    data() {
      return {
        loading: false,
        weeklyPeriod: false,
        monthlyPeriod: false,
        dialog: false
      }
    },

    watch: {
      rules: function() {
        this.weeklyPeriod = !!this.rules.find(r => r.period === 'weekly')
        this.monthlyPeriod = !!this.rules.find(r => r.period === 'monthly')
      }
    },

    methods: {
      handlePeriod(value, period){
        value ? this.create(period) : this.remove(period)
      },

      async create(period) { 
        this.loading = true
        const response = await this.$api.createTimeLockingRule({ 
          workspace_id: this.workspace.id,
          period
        })
        if(response.data){
          this.$emit("addRule", response.data)
        }
        this.loading = false
      },

      async remove(period) { 
        this.loading = true
        const rule = this.rules.find(r => r.period === period)
        const response = await this.$api.deleteTimeLockingRule(rule.id)
        if(response.data){
          this.$emit("removeRule", rule.id)
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
