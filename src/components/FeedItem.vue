<template>
  <div class="border-b border-grey-light p-6">
    <div class="flex text-left w-full">
      <div class="pl-16 relative">
        <a :href="video.user.link" target="_blanc">
          <img :src="userImage" class="rounded-full block absolute pin-t pin-l w-16 h-16">
        </a>
        <div class="ml-4">
          <p class="text-base mb-2">
            <a
              :href="video.user.link"
              class="font-bold text-black no-underline hover:underline"
              v-html="video.user.name"
              target="_blanc"
            ></a> ·
            <span class="text-grey-dark text-sm">{{ userLikes }} likes</span> ·
            <span class="text-grey-dark text-sm">{{ video.created_time | moment("MMMM Do YYYY") }}</span>
          </p>
          <div class="play-video-hover relative">
            <div class="relative video-image mb-4 rounded-lg overflow-hidden">
              <img :src="videoImage" class="block">
              <div class="video-image-overlay">
                <font-awesome-icon icon="play"/>
              </div>
            </div>
            <h1 v-html="video.name" class="text-2xl mb-1"></h1>
            <p class="mb-4 text-sm leading-normal" v-line-clamp:20="3" v-html="video.description"></p>
            <p class="text-grey text-sm font-bold">
              <span class="mr-4">
                <font-awesome-icon icon="heart" class="mr-2"/>
                {{ likes }}
              </span>
              <span class="mr-4">
                <font-awesome-icon icon="comment" class="mr-2"/>
                {{ comments }}
              </span>
              <span class="mr-4">
                <font-awesome-icon icon="play" class="mr-2"/>
                {{ plays }}
              </span>
            </p>
            <a :href="video.link" target="_blanc" class="absolute pin-x pin-y"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["video", "index"],
  computed: {
    videoImage() {
      return this.video.pictures.sizes[0].link;
    },
    userImage() {
      return this.video.user.pictures.sizes[2].link;
    },
    userLikes() {
      return this.video.user.metadata.connections.likes.total;
    },
    comments() {
      return this.video.metadata.connections.comments.total;
    },
    likes() {
      return this.video.metadata.connections.likes.total;
    },
    plays() {
      return this.video.stats.plays ? this.video.stats.plays : "?";
    }
  }
};
</script>
<style>
.video-image {
  @apply relative;
}
.play-video-hover:hover .video-image-overlay {
  opacity: 1;
}
.video-image-overlay {
  cursor: pointer;
  opacity: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  font-size: 120px;
  @apply flex items-center justify-center;
  transition: all 0.3s ease;
}
</style>