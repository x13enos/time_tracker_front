<template>
  <div class="container">
    <nuxt-link to="/tasks">
      Tasks
    </nuxt-link>
    <div>
      <logo />
      <h1 class="title">
        time_tracker_front
      </h1>
      <h2 class="subtitle">
        The frontend for time tracker app
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
</style>
