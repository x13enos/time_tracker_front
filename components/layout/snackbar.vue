<template>
  <v-snackbar
    v-model="show"
    :color="snack.color"
    :top="true"
    :right="true">
    {{ snack.message }}

    <template v-slot:action="{ attrs }">
      <v-icon v-bind="attrs" @click="show = false">mdi-close-circle</v-icon>
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
      if(val)
        this.show = true
    },

    show(val){
      if(!val){
        this.updateSnack({
          message: "",
          color: ""
        })
      }
    }
  },

  methods: {
    ...mapMutations(["updateSnack"])
  }
}
</script>
