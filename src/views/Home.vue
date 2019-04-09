<template>
<div class="border-t border-grey-light">
  <div class="max-w-xl mx-auto md:flex justify-center">
      <filters class="w-full md:w-1/4" v-model="filters" />
      <feed class="w-full md:w-3/4" :videos-per-page="filters.videosPerPage" :min-likes="filters.minLikes" :search="filters.search" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Feed from '@/components/Feed.vue'
import Filters from '@/components/Filters.vue';

export default {
  name: 'home',
  components: {
    Feed,
    Filters
  },
  data: () => ({
    filters: {
      minLikes: 0,
      videosPerPage: 10,
      search: ''
    }
  })
}
</script>
