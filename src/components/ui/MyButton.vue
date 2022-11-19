<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MyButton"
}
</script>

<style lang="scss">
.btn {
  padding: 10x 15px;
  background: none;
  color: $main-color;
}
</style>