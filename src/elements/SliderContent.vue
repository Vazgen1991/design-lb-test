<template>

  <ul class="reaction-section">
    <li class="reaction-item" v-if="infoList.commentCount > 0" >
      <span class="icon-Union m-r-5" ></span>
      <span class="count">{{infoList.commentCount}}</span>
    </li>
    <li class="reaction-item" v-if="infoList.likeCount > 0">
                          <span class="icon-like m-r-5"
                                @click="addLike(idx)"
                          ></span>
      <span class="count">{{infoList.likeCount}}</span>
    </li>
  </ul>

</template>

<script>
export default {
  name: "SliderContent",
  props:['infoList','addLike','idx']
}
</script>

<style scoped>

</style>