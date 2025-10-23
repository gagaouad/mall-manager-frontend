<template>
  <h1>{{ title }}</h1>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
h1 {
  padding-left: 50px;
  height: 10%;
}
</style>
