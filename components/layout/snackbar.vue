<template>
  <v-snackbar
    v-model="show"
    :color="snack.color"
    :top="true"
    :right="true"
    @input="clean">
    <template v-if="snack.message">
      {{ snack.message }}
    </template>

    <template v-if="snack.htmlContent">
      <div v-html="snack.htmlContent" />
    </template>

    <template v-slot:action="{ attrs }">
      <v-icon v-bind="attrs" @click="clean">
        mdi-close-circle
      </v-icon>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
  data () {
    return {
      show: false
    }
  },

  computed: {
    ...mapState(["snack"])
  },

  watch: {
    "snack.message"(val){
      this.show = !!val;
    },

    "snack.htmlContent"(val){
      this.show = !!val;
    }
  },

  methods: {
    ...mapMutations(["updateSnack"]),

    clean() {
      this.updateSnack({ htmlContent: '', message: '', color: '' });
    }
  }
}
</script>

<style>
  .v-application .snackbar-link {
    color: white;
  }
</style>