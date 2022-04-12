<template>
  <a class="breadcrumb-link" :href="href">{{name}}</a>
</template>

<script>
export default {
  name: "BreadcrumbLink",
  props:['name','href']
}
</script>

<style scoped>

</style>