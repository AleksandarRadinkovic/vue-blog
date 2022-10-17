<template>
  <div>
    <v-btn
      text
      @click="$router.go(-1)"
      class="ma-4"
      small
    >
      <v-icon left>mdi-chevron-left</v-icon>
      <span>Back</span>
    </v-btn>
    <v-container>
      <v-row>
        <v-col cols="12" v-if="loading">
          <v-progress-linear indeterminate></v-progress-linear>
        </v-col>
        <template v-if="item">
          <v-col cols="12">
            <h2 class="text-h3">{{ item.title }}</h2>
            <div>
              <v-chip
                v-for="(category, i) in item.category"
                :key="i"
                class="my-2 mr-2"
                color="primary"
                outlined
              >{{ category }}</v-chip>
            </div>

            <div>
              <v-img
                :src="item.img"
                class="my-3"
                cover
                height="200"
              />
            </div>

            <div class="text-body-2">{{ item.body }}</div>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'NewsDetails',

    data: () => ({

    }),
    mounted() {
      if(this.news === null) this.getAllNews()
    },
    methods: {
      ...mapActions(["getAllNews"])
    },
    computed: {
      ...mapGetters(["news", "error", "loading"]),
      item: function() {
        if(this.news && this.news.some(i => i.id == this.$route.params.id)) {
          return this.news.find(i => i.id == this.$route.params.id)
        } else {
          return null
        }
      }
    }
  }
</script>
