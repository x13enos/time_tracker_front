<template>
  <v-input class="time-input">
    <input placeholder="0.00" :value="spentTime" @blur="updateTime">
  </v-input>
</template>
<script>
export default {
  props: {
    spentTime: {
      type: String,
      required: false,
      default: null
    }
  },

  methods: {
    updateTime (event) {
      const time = event.target.value
      this.$emit('update', parseTime(time))
    }
  }
}

function parseTime (value) {
  const onlyDigits = value.match(/\d/g)
  if (onlyDigits === null) { return '0.00' }
  if (onlyDigits.length <= 2) {
    const decimalPart = onlyDigits[0] === '0' ? onlyDigits[1] : onlyDigits.join('');
    return `0.${decimalPart}`;
  }

  const integerPart = parseInt(onlyDigits.join('').slice(-4, -2))
  const decimalPart = onlyDigits.join('').slice(-2)

  return [integerPart, decimalPart].join('.')
}
</script>

<style lang="scss">
  div.v-input.time-input input{
    text-align: center;
    width: 100%;
  };

  div.v-input.time-input input::placeholder {
    font-size: 16px;
    color: #828282;
    font-family: "Roboto", sans-serif;
    line-height: 1.5;
  };
</style>
