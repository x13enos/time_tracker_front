<template>
  <v-card class="elevation-4 mt-3 auth-card">
    <v-card-text class="d-flex justify-center auth-links-block">
      <div v-if="link === 'sign-in'">
        {{ $t('auth.additional_links.sign-in.description') }}
        <nuxt-link to="/auth/sign-in">
          {{ $t('auth.additional_links.sign-in.link') }}
        </nuxt-link>
      </div>
      <div v-if="link === 'sign-up'">
        {{ $t('auth.additional_links.sign-up.description') }}
        <nuxt-link to="/auth/sign-up">
          {{ $t('auth.additional_links.sign-up.link') }}
        </nuxt-link>
      </div>
      <div v-if="link === 'home'">
        <nuxt-link to="/">
          {{ $t('auth.additional_links.home') }}
        </nuxt-link>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
</style>
