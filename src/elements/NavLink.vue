<template>
  <a class="nav-link" :class="active?'active':''" :href="href">{{name}}</a>
</template>

<script>

export default {
  name: "NavLink",
  props: ['name',  'href', 'active'],
}
</script>