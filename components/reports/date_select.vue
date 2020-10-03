<template>
  <v-menu
    v-model="dateMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :label="label"
        readonly
        :value="value"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      :locale="locale"
      :value="value"
      :max="max"
      :min="min"
      @input="updateValue"
      no-title
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      retuired: true
    },
    value: {
      type: String,
      required: false
    },
    min: {
      type: String,
      required: false
    },
    max: {
      type: String,
      required: false
    },
    locale: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      dateMenu: false
    }
  },

  methods: {
    updateValue(value){
      this.$emit('input', value);
      this.dateMenu = false
    }
  }
}
</script>
