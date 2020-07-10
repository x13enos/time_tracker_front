<template>
  <div>
    <h1>{{ $t('users.title') }}</h1>

    <div v-if="users.length">
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">{{ $t("users.name") }}</th>
            <th class="text-left">{{ $t("users.role") }}</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ $t(`users.roles.${user.role}`) }}
            <td align="right">
              <time-reports
                v-if="$appMethods.extensionEnabled()"
                :userId="user.id" />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
    <h3 v-else>{{ $t('users.no_users') }}</h3>
  </div>
</template>

<script>
import TimeReports from "@/components/admin/users/time_reports_block"

export default {

  components: {
    "time-reports": TimeReports
  },

  data() {
    return {
      users: []
    }
  },

  mounted(){
    this.fetchUsers();
  },

  methods: {

    async fetchUsers(){
      const response = await this.$api.getUsersForManaging()
      if(response.data)
        this.users = response.data
    }
    
  }
}
</script>
