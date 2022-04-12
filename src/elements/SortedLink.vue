<template>
  <a @click="sorted(link.name)" :class="{'active':active}" >{{link.name}}</a>
</template>

<script>
export default {
  name: "SortedLink",
  props:['link','idx','sorted','active']
}
</script>

<style scoped>

</style>