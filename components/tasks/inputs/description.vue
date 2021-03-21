<template>
  <v-input class="description-input">
    <input placeholder="What are you working on?" :value="description" @blur="updateDescription">
  </v-input>
</template>
<script>
export default {
  props: {
    description: {
      type: String,
      required: false,
      default: null
    }
  },

  methods: {
    updateDescription (event) {
      this.$emit('update', event.target.value)
    }
  }
}
</script>

<style lang="scss">
  div.v-input.description-input input{
    width: 100%;
  };

  div.v-input.description-input input::placeholder {
    font-size: 16px;
    color: #828282;
    font-family: "Roboto", sans-serif;
    line-height: 1.5;
  };
</style>
