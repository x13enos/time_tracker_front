<template>
  <v-menu
    v-model="dateMenu"
    :close-on-content-click="false"
    :nudge-left="55"
    :nudge-bottom="5"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <div class="btn calendar-btn" v-on="on">
        <v-icon class="tasks-calendar-icon">mdi-calendar-month</v-icon>
      </div>
    </template>
    <v-date-picker
      v-model="date"
      @input="updateValue"
      no-title
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { mapActions } from 'vuex';
export default {

  data() {
    return {
      date: null,
      dateMenu: false
    }
  },

  methods: {
    ...mapActions(['updateSelectedDate']),

    updateValue(value){
      const parsedDate = value.split('-').reverse();
      this.updateSelectedDate(parsedDate);
      this.dateMenu = false
    }
  }
}
</script>

<style lang="scss">
  .date-panel .tasks-calendar-icon {
    color: $font-green;
  }
</style>