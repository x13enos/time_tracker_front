<template>
  <v-app id="inspire">
    <Header />
    <v-container>
      <v-row align="start" justify="start">
        <v-col cols="12">
          <nuxt />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Header from '~/components/layout/Header.vue'

export default {
  components: { Header },

  middleware: ['auth']
}
</script>
