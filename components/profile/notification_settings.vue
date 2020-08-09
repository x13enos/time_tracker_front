<template>
  <v-list-item-group
    v-model="selectedNotificationSettings"
    multiple>
    <v-list-item v-for="rule in rules" :key="rule" :value="rule">
      <template v-slot:default="{ active, toggle }">
        <v-list-item-action>
          <v-checkbox
            v-model="active"
            color="primary"
            :true-value="rule"
            @click="toggle"
          ></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{ $t(`profile.notification_settings.${rule}`) }} </v-list-item-title>
        </v-list-item-content>
      </template>
    </v-list-item>
  </v-list-item-group>
</template>

<script>
import { NOTIFICATION_SETTINGS, EXTENDED_NOTIFICATION_SETTINGS } from "@/services/constants.js";
import { mapGetters } from "vuex";

export default {
  props: {
    value: {
      type: Array,
      required: true
    },

    typeOfNotifications: {
      type: String,
      required: true
    }
  },

  data: function() {
    return {
      selectedNotificationSettings: this.value
    }
  },

  watch: {
    selectedNotificationSettings: function(value) {
      this.$emit('input', value);
    }
  },

  computed: {
    ...mapGetters(['isAdmin']),

    rules() {
      const settings = this.$config.extensionEnabled ? EXTENDED_NOTIFICATION_SETTINGS : NOTIFICATION_SETTINGS;
      const notifications = settings[this.typeOfNotifications];
      if(this.isAdmin){
        return [...notifications.everyone, ...notifications.admin];
      }
      else
        return notifications.everyone;
    }
  }
}
</script>
