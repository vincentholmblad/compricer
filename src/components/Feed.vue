<template>
  <div class="w-3/4 md:pl-6 pt-6">
    <div class="bg-white shadow rounded mb-6">
      <div class="py-12 px-16 text-center" v-if="loading">
        <fingerprint-spinner
          :animation-duration="1500"
          :size="64"
          color="#3490dc"
          class="mx-auto"
        />
        Loading videos...
      </div>
      <div v-else-if="videoFeed.length">
        <feed-item :video="video" :index="index" v-for="(video, index) in videoFeed" v-bind:key="video.id" />
      </div>
      <div v-else-if="search.length || minLikes > 0" class="p-16">
        <h1 class="text-2xl">No videos on this page matches your search</h1>
      </div>
      <div v-else-if="error">
        <h1 class="text-2xl">An error occured. Try again?</h1>
      </div>
    </div>
    <div class="md:flex justify-between items-center mb-24 px-4 md:px-0">
      <button @click="prevPage()" class="rounded bg-white shadow px-6 py-4 w-full md:w-1/3 disabled focus:outline-none" :class="{ 'hover:shadow-lg': page != 1, 'pointer-events-none': page == 1 }" :disabled="page == 1">Previous page</button>
      <span class="text-grey-dark my-4 md:m-0 block" v-if="totalVideos > 0">Page {{ page }} of {{  totalPages }}</span>
      <button @click="nextPage()" class="rounded bg-white shadow px-6 py-4 w-full md:w-1/3 focus:outline-none" :class="{ 'hover:shadow-lg': page != totalPages, 'pointer-events-none': page == totalPages }" :disabled="page == totalPages">Next page</button>
    </div>
  </div>
</template>

<script>
import { FingerprintSpinner } from 'epic-spinners';
import FeedItem from './FeedItem.vue';
var Vimeo = require('vimeo').Vimeo;
var client = new Vimeo('a4d6302199db898da47931d16aea8d74c8148df1', 'rAsYK7Eu/m3LU972s2vk55SSc9DAgsC4FrL4wh8tOme2fNjIUdcypbCq1JTBrzjGlHT8Fv+pD2ynXCDQHaogp77wclK99k5SnOQPUdFTB+gcVZVfCeRQvjh/1S7kKwwa', 'd9abb30a1eb5d44094e61ef2d6f53228');
export default {
  props: ['minLikes', 'videosPerPage', 'search'],
  data: () => ({
    videos: [],
    totalVideos: 0,
    page: 1,
    error: null,
    loading: false
  }),
  components: {
    FeedItem,
    FingerprintSpinner
  },
  mounted() {
    this.getVideos();
  },
  computed: {
    videoFeed() {
      return this.videos.filter((video) => {
        return video.user.metadata.connections.likes.total >= this.minLikes && this.search ? video.description.toLowerCase().indexOf(this.search.toLowerCase()) != -1 : true;
      });
    },
    totalPages() {
      return Math.ceil(this.totalVideos / this.videosPerPage);
    }
  },
  watch: {
    videosPerPage() {
      this.changeVideosPerPage(this.videosPerPage);
    }
  },
  methods: {
    nextPage() {
      if(this.page + 1 <= this.totalPages) {
        this.page++;
        this.getVideos();
      }
    },
    prevPage() {
      if(this.page - 1 > 0) {
        this.page--;
        this.getVideos();
      }
    },
    changeVideosPerPage(perPage) {
      this.videosPerPage = perPage;
      this.page = 1;
      this.totalVideos = 0;
      this.getVideos();
    },
    getVideos() {
      this.error = null;
      this.loading = true;

      client.request({
        path: '/channels/top/videos',
        query: {
          page: this.page,
          per_page: this.videosPerPage,
          fields: 'id,name,description,metadata,user,pictures,created_time,link,stats',
          sizes: '640x480,100x100'
        }
      }, (error, body, status_code, headers) => {
        if (error) {
          this.loading = false;
          this.error = true;
        } else {
          this.loading = false;
          this.totalVideos = body.total;
          this.videos = this.videos = body.data;
        }
      });
    }
  }
}
</script>