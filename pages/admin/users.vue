<template>
  <div>
    <h1 class="row main-content-container title-block mt-1">
      {{ $t('users.title') }}
    </h1>

    <div v-if="users.length" class="mt-8">
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
              <user-form
                v-if="user.role !== 'owner' "
                :user="user"
                @updateUserData="updateUserData"/>
              <time-reports
                v-if="$config.extensionEnabled"
                :userId="user.id" />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
    <h3 v-if="!isLoading && !users.length">{{ $t('users.no_users') }}</h3>
  </div>
</template>

<script>
import TimeReports from "@/components/admin/users/time_reports_block"
import UserForm from "@/components/admin/users/user_form"

export default {

  head() {
    return {
      title: this.$t('page_titles.users')
    }
  },

  components: {
    "time-reports": TimeReports,
    "user-form": UserForm
  },

  data() {
    return {
      users: [],
      isLoading: true
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

      this.isLoading = false
    },

    updateUserData(data) {
      const elementIndex = this.users.findIndex((e) => { return e.id === data.id });
      this.$set(this.users, elementIndex, data);
    }

  }
}
</script>
