<template>
  <div :class="$i18n.locale === 'ru' ? 'montserrat' : 'poppins'">
    <v-app>
      <Sidebar />
      <v-main>
        <!-- <Header /> -->
          <v-container 
            :fluid="true" 
            class="main-container">
            <nuxt />
          </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Sidebar from '~/components/layout/sidebar.vue'; 
import { mapGetters, mapState } from 'vuex';

export default {
  name:"DefaultLayout",
  middleware: ['auth', 'spa_redirects'],
  components: { Sidebar },

  computed: {
    ...mapGetters(["userAuthorized"])
  }
}
</script>

<style scoped>
  .navbar {
    border-right: 1px solid #E0E0E0;
  }

  .main-container{
    padding: 0 12px;
    background-color: #F5F5F5;
    height: 100%;
  }
</style>
