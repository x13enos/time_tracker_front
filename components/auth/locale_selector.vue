<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <span class="flag-block" v-bind="attrs" v-on="on">
        <gb-flag :code="currentFlag" size="small" />
      </span>
    </template>
    <v-list>
      <v-list-item
        v-for="locale in locales"
        :key="locale.title"
        link
        @click="changeLocale(locale.code)"
      >
        <v-list-item-title class='d-flex align-center '>
          <gb-flag :code="locale.flag" size="small" />
          <span class="locale-title">{{ locale.title }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { LOCALES } from "@/services/constants.js";

export default {
  data: function() {
    return {
      locales: LOCALES
    }
  },

  computed: {
    currentFlag() {
      if (this.$i18n.locale) {
        const localeData = LOCALES.find((locale) => { return locale.code === this.$i18n.locale});
        return localeData.flag;
      } else {
        return 'gb'
      }
    }
  },

  methods: {
    changeLocale(locale) {
      localStorage.setItem("locale", locale);
      this.$i18n.locale = locale;
    }
  }
}
</script>

<style>
  .locale-title {
    margin-left: 0.5rem;
  }

  .flag-block {
    margin-top: 0.5rem;
  }
</style>
