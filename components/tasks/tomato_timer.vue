<template>
  <div>
    <v-menu
      v-model="timer"
      content-class="pomodoro-menu"
      :close-on-content-click="false"
      nudge-top="-10"
      nudge-left="0"
      offset-y
    >
      <!-- Timer activator -->
      <template v-slot:activator="{ on }">
        <div v-if="!selectedPeriod && !intervalId" v-on="on" class="default-btn btn-icon-with-text">
          <v-icon>mdi-timer-outline</v-icon>
          <span class="mr-4 font-green">{{ $t("pomodoro.title") }}</span>
        </div>
        <div v-else class="d-flex align-center current-time-block">
          <div class="default-btn btn-icon-with-text d-flex align-center gray-border" v-on="on">
            <v-icon>mdi-timer-outline</v-icon>
            <div class="current-time">{{ parsedTime }}</div>
          </div>
          <div v-if="intervalId" class="timer-btn mr-2 ml-2" @click="pauseTimer">
            <v-icon small>mdi-pause</v-icon>
          </div>
          <div v-else class="timer-btn mr-2 ml-2" @click="startTimer(selectedPeriod)">
            <v-icon small>mdi-play</v-icon>
          </div>
          <div class="timer-btn stop-btn mr-2" @click="stopTimer">
            <v-icon small>mdi-stop</v-icon>
          </div>
        </div>
      </template>

      <!-- Menu options -->
      <template v-if="timer">
        <div
          v-for="period in ['short_break', 'long_break', 'pomodoro_option']"
          :key="period"
          class="d-flex option" :class="{ 'active-timer': selectedPeriod === period }"
          >
          <div class="description">
            <div class="option_title">{{ $t(`pomodoro.${period}`) }}</div>
            <div class="mins">
              {{ selectedPeriod === period ? parsedTime : $t(`pomodoro.${period}_mins`) }}
            </div>
          </div>
          <div v-if="selectedPeriod === period && !!intervalId" class="timer-btn mr-2" @click="pauseTimer">
            <v-icon small>mdi-pause</v-icon>
          </div>
          <div v-else class="timer-btn mr-2" @click="startTimer(period)">
            <v-icon small>mdi-play</v-icon>
          </div>
          <div class="timer-btn stop-btn" @click="stopTimer">
            <v-icon small>mdi-stop</v-icon>
          </div>
        </div>
      </template>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      timer: false,
      intervalId: null,
      totalSeconds: 0,
      selectedPeriod: null,
      timerPeriods: {
        short_break: 300,
        long_break: 600,
        pomodoro_option: 1500
      }
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
    startTimer(period) {
      if (!this.selectedPeriod || this.selectedPeriod !== period) {
        this.pauseTimer()
        this.selectedPeriod = period
        this.totalSeconds = this.timerPeriods[period]
      }
      this.timer = false
      this.intervalId = setInterval(this.checkTimer, 1000)
    },

    pauseTimer() {
      clearInterval(this.intervalId)
      this.intervalId = null
    },

    checkTimer() {
      if(this.totalSeconds === 0) {
        this.stopTimer()
        if(window.Notification.permission === "granted")
          this.sendNotification()
      }
      else
        --this.totalSeconds
    },

    stopTimer() {
      this.timer = true
      this.selectedPeriod = null
      this.totalSeconds = 0
      this.pauseTimer()
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

<style lang="scss">
  .pomodoro-menu {
    background-color: white;
    padding: 15px 0;

    .option {
      padding: 10px 20px;  
    }

    .active, .option:hover {
      background-color: $pale-green-color;

      .option_title {
        color: $font-green;
      }

      .timer-btn > .v-icon {
        color: #333333;
      }

      .stop-btn > .v-icon {
        color: #EB5757;
      }
    }

    .description {
      margin-right: 85px;
    }

    .option_title {
      margin-top: 0.125rem;
      font-weight: 400;
      font-size: 10px;
      color: #828282;
    }

    .mins {
      font-weight: 400;
      line-height: 18px;
    }
  }

  .active-timer, .current-time-block, .pomodoro-menu .option:hover {
    background-color: $pale-green-color;

    .option_title {
      color: $font-green;
    }

    .timer-btn > .v-icon {
      color: #333333;
    }

    .stop-btn > .v-icon {
      color: #EB5757;
    }
  }

  .timer-btn {
    text-align: center;
    cursor: pointer;
    background-color: #FAFAFA;
    border-radius: 5px;
    height: 34px;
  }

  .timer-btn > .v-icon {
    color: #BDBDBD;
    height: 6px;
    margin: 14px 9px;
  }

  .current-time-block {
    border-radius: 5px;
    background-color: white;

    .current-time {
      min-width: 45px;
      margin: 0.125rem 1rem 0 0.25rem;
      color: $font-green;
    }

    .gray-border {
      border-radius: 5px 0 0 5px;
      border-right: 1px solid #F2F2F2;
    }
  }
</style>
