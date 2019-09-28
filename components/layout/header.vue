<template>
  <div>
    <v-app-bar
      color="primary"
      :dark="true"
    >
      <v-toolbar-title>
        Time Tracker
      </v-toolbar-title>

      <div class="flex-grow-1" />

      <v-toolbar-items>
        <v-btn text>
          Tasks
        </v-btn>
      </v-toolbar-items>

      <template>
        <v-btn icon>
          <v-icon>
            mdi-account-circle
          </v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>
            mdi-logout
          </v-icon>
        </v-btn>
      </template>
    </v-app-bar>
  </div>
</template>
