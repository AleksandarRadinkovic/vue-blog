<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-toolbar-title>News App</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
        @click="getAllNews"
      >
        <span class="mr-2">Refresh</span>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["getAllNews"])
  }
};
</script>
