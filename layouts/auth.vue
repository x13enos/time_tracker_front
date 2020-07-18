<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script>
  import Snackbar from '~/components/layout/snackbar.vue'

  export default {
    components: { Snackbar }
  }
</script>
