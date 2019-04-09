<template>
  <div class>
    <div class="md:sticky pin-t pt-6">
      <div class="bg-white shadow rounded w-full text-left">
        <h2 class="p-6 border-b border-grey-light">Filters</h2>
        <div class="p-6 border-b border-grey-light text-grey-dark text-sm">
          <label class="text-sm mb-4 block">Videos per page</label>
          <div class="flex items-center mb-4 cursor-pointer" @click="videosPerPage = 10">
            <div class="border border-grey w-6 h-6 rounded-full mr-2 relative">
              <div class="absolute pin-x pin-y m-1 bg-blue rounded-full" v-if="videosPerPage == 10"></div>
            </div>10
          </div>
          <div class="flex items-center mb-4 cursor-pointer" @click="videosPerPage = 25">
            <div class="border border-grey w-6 h-6 rounded-full mr-2 relative">
              <div class="absolute pin-x pin-y m-1 bg-blue rounded-full" v-if="videosPerPage == 25"></div>    
            </div>25
          </div>
          <div class="flex items-center cursor-pointer" @click="videosPerPage = 50">
            <div class="border border-grey w-6 h-6 rounded-full mr-2 relative">
              <div class="absolute pin-x pin-y m-1 bg-blue rounded-full" v-if="videosPerPage == 50"></div>    
            </div>50
          </div>
        </div>
        <div class="p-6 border-b border-grey-light text-grey-dark text-sm">
          <label class="text-sm block mb-4 cursor-pointer">Minimum likes for uploader</label>
          <div class="flex items-center mb-4" @click="minLikes = 0">
            <div class="border border-grey w-6 h-6 rounded-full mr-2 relative">
              <div class="absolute pin-x pin-y m-1 bg-blue rounded-full" v-if="minLikes == 0"></div>  
            </div>0
          </div>
          <div class="flex items-center mb-4 cursor-pointer" @click="minLikes = 10">
            <div class="border border-grey w-6 h-6 rounded-full mr-2 relative">
              <div class="absolute pin-x pin-y m-1 bg-blue rounded-full" v-if="minLikes == 10"></div>    
            </div>10
          </div>
          <div class="flex items-center cursor-pointer" @click="minLikes = 25">
            <div class="border border-grey w-6 h-6 rounded-full mr-2 relative">
              <div class="absolute pin-x pin-y m-1 bg-blue rounded-full" v-if="minLikes == 25"></div>    
            </div>25
          </div>
        </div>
        <div class="relative">
            <input type="search" v-model="search" class="p-6 pl-12 w-full border-b border-grey-light text-grey-dark text-sm focus:outline-none" placeholder="Search in description" />
            <font-awesome-icon icon="search" class="absolute search-icon text-grey-light pointer-events-none" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    minLikes: 0,
    videosPerPage: 10,
    search: ''
  }),
  watch: {
    minLikes() {
      this.emit();
    },
    videosPerPage() {
      this.emit();
    },
    search() {
      this.emit();
    }
  },
  methods: {
    emit() {
      this.$emit("input", {
        minLikes: this.minLikes,
        videosPerPage: this.videosPerPage,
        search: this.search
      });
    }
  }
};
</script>

<style>
.search-icon {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    margin-top: -2px;
}
</style>
