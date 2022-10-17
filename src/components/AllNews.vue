<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-if="loading">
        <v-progress-linear indeterminate></v-progress-linear>
      </v-col>
      <template v-else>
        <v-col v-for="(item, index) in filteredNews" cols="4" :key="index">
          <v-hover>
            <v-card 
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 8 : 2}`"
              style="cursor: pointer"
              @click="$router.push(`/news/${item.id}/show`)"
            >
              <div class="cover-image" :style="{ background: `url(${item.img}), url(${prevImage})` }" ></div>
              <div class="pa-4">
                <h2 class="text-h5">{{item.title}}</h2>
                <div>
                  <v-chip
                    v-for="(category, i) in item.category"
                    :key="i"
                    class="my-2 mr-2"
                    small
                    color="primary"
                    outlined
                  >{{ category }}</v-chip>
                </div>
                <div class="body-2">{{ item.body }}</div>
              </div>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12">
          <v-pagination
            v-model="page"
            :length="paginationLength"
          ></v-pagination>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'AllNews',

    data: () => ({
      itemsPerPage: 6,
      page: 1,
      prevImage: require('../assets/news-prev.png')
    }),
    mounted() {
      if(this.news === null) this.getAllNews()
      this.page = this.setedPage
    },
    methods: {
      ...mapActions(["getAllNews"]),
      ...mapMutations(["setPage"])
    },
    computed: {
      ...mapGetters({news: "news", error: "error", loading: "loading", setedPage: "page"}),
      filteredNews() {
        if(this.news) {
          return this.news.filter((i, index) => 
            index >= (this.page - 1) * this.itemsPerPage && index < this.page * this.itemsPerPage
          )
        } else {
          return []
        }
      },
      paginationLength() {
        if(this.news) {
          return Math.ceil(this.news.length / this.itemsPerPage)
        } else {
          return 0
        }
      }
    },
    watch: {
      page: function(val) {
        this.setPage(val)
      }
    }
  }
</script>

<style>
  .cover-image {
    height: 200px;
    background-size: cover!important;
  }
</style>