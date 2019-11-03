<template>
  <v-app>
    <Header />
    <v-content>
      <v-container :fluid="true" class="main-container">
        <v-row align="start" justify="start" class="main-row">
          <v-col cols="12">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from '~/components/layout/Header.vue'

export default {
  components: { Header }
}
</script>

<style scoped>
  .main-container{
    background-color: #f2f3fa;
    height: 100%;
  }

  .main-row{
    background-color: white;
    margin: 2rem 1rem 0rem 1rem;
  }
</style>
