<template>
  <v-app id="inspire">
    <Header />
    <v-container>
      <nuxt />
    </v-container>
  </v-app>
</template>

<script>
import Header from '~/components/layout/Header.vue'

export default {
  components: { Header }
}
</script>
