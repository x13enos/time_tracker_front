<template>
  <v-slide-y-transition>
    <div v-if="show" class="block">
      <div class="notification d-flex justify-space-between" :class="snack.color">
        <span class="message" v-html="snack.message" />
        <v-icon color="white" @click="clean">
          mdi-close
        </v-icon>
      </div>
    </div>
  </v-slide-y-transition>

</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
  data () {
    return {
      show: false,
      timeoutId: null
    }
  },

  computed: {
    ...mapState(["snack"])
  },

  watch: {
    "snack.message"(val){
      this.show = !!val;

      if (!!val) {
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(() => { this.clean(); }, 4000)
      }
    }
  },

  methods: {
    ...mapMutations(["updateSnack"]),

    clean() {
      this.updateSnack({ message: '', color: '' });
    }
  }
}
</script>

<style scoped>
  .block {
    margin-top: 1.5rem;
    padding: 0px 0.3rem;
  }

  .notification {
    color: #FFFFFF;
    border-radius: 5px;
    padding: 10px 30px;
  }

  .red { background-color: #CC3B3B; }
  .green { background-color: #49BB75; }

  .message {
    line-height: 175%;
  }
</style>
