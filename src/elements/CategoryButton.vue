<template>
  <button
      v-if="categories.title != 'Парогенератор'"
      class="select-btn outline"
      @click="openCategory(idx)"
      :class="isOpen?'isOpen':''"
  >
    {{categories.title}}
    <span class="selected-count" v-if="categories.checkedCount > 0">{{categories.checkedCount}}</span>
    <i class="icon-down" ></i>
  </button>
</template>

<script>
export default {
  name: "CategoryButton",
  props:['categories','openCategory','idx','isOpen']
}
</script>

<style scoped>

</style>