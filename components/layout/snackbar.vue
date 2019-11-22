<template>
  <v-snackbar
    v-model="show"
    :color="snack.color"
    :top="true"
    :right="true">
    {{ snack.message }}
    <v-icon @click="show = false">mdi-close-circle</v-icon>
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
