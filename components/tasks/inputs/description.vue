<template>
  <v-input class="description-input">
    <input 
      :placeholder="placeholder || $t('time_sheet.add_description')" 
      :value="description" 
      @input="$emit('selectPendingClass')"
      @blur="updateDescription">
  </v-input>
</template>
<script>
export default {
  props: {
    description: {
      type: String,
      required: false,
      default: null
    },

    placeholder: {
      type: String,
      required: false
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
    line-height: 1.5;
  };
</style>
