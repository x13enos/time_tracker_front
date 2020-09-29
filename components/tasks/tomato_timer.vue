<template>
  <div>
    <div v-if="timerStarted" class="d-flex align-center">
      <div>{{ parsedTime }}</div>

      <v-btn
        small
        class="ma-2"
        color="error"
        @click="stopTimer"
      >
        {{ $t("pomodoro.stop") }}
      </v-btn>
    </div>

    <template v-if="timer && !timerStarted">
      <v-btn
        small
        class="ma-2"
        @click="startTimer(1500)"
      >
        {{ $t("pomodoro.title") }}
      </v-btn>
      <v-btn
        small
        class="ma-2"
        @click="startTimer(600)"
      >
        {{ $t("pomodoro.long_break") }}
      </v-btn>
      <v-btn
        small
        class="ma-2"
        @click="startTimer(300)"
      >
        {{ $t("pomodoro.short_break") }}
      </v-btn>

      <v-btn icon @click="timer = false">
        <v-icon>mdi-timer-off</v-icon>
      </v-btn>
    </template>

    <v-btn v-if="!timer" icon @click="enableTimer" class="mt-1">
      <v-icon>mdi-timer</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      timer: false,
      intervalId: null,
      totalSeconds: null
    }
  },

  computed: {
    parsedTime(){
      const minutes = String(Math.floor(this.totalSeconds/60)).padStart(2, 0)
      const seconds = String(this.totalSeconds % 60).padStart(2, 0)
      return `${minutes}:${seconds}`
    },

    timerStarted() {
      return this.totalSeconds > 0
    }
  },

  methods: {
    startTimer(numberOfSeconds) {
      this.totalSeconds = numberOfSeconds
      this.intervalId = setInterval(this.checkTimer, 1000)
    },

    checkTimer() {
      if(this.totalSeconds === 0) {
        clearInterval(this.intervalId)
        if(window.Notification.permission === "granted")
          this.sendNotification()
      }
      else
        --this.totalSeconds
    },

    stopTimer() {
      this.totalSeconds = 0
      clearInterval(this.intervalId)
    },

    enableTimer() {
      if(window.Notification.permission === "default")
        window.Notification.requestPermission()
      this.timer = true
    },

    sendNotification(){
      new Notification(this.$t("pomodoro.time_is_up"))
      var audio = new Audio('./alarm.mp3');
      audio.play();
    }
  }
}
</script>

<style scoped>
</style>
