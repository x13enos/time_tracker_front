<template>
  <div>
    <h1>
      Profile settings
    </h1>

    <v-row>
      <v-col cols="3">
        <v-form>
          <v-text-field
            v-model="form.name"
            label="Name"
          />

          <v-text-field
            v-model="form.email"
            label="Email"
          />

          <v-select
            v-model="form.timezone"
            label="Timezone"
            :items="timezoneList"
          />
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Constants from "@/services/constants";
import { mapState } from 'vuex'

export default {

  data() {
    return {
      form: {
        name: null,
        email: null,
        timezone: null
      }
    }
  },

  mounted(){
    Object.assign(this.form, this.user)
  },

  computed: {
    ...mapState(["user"]),

    timezoneList(){
      return Object.keys(Constants.TIMEZONES).map((key) => {
        return { text: Constants.TIMEZONES[key], value: key }
      });
    }
  }
}
</script>
