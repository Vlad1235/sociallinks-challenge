<template>
  <div class="dialog" v-show="getDialogVisible" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {HIDE_MODAL} from "@/store/actions/users/users";

export default {
  name: "MyDialog",
  computed: {
    ...mapGetters(['getDialogVisible']),
  },
  methods: {
    hideDialog() {
      this.$store.dispatch(HIDE_MODAL);
    }
  }
}
</script>

<style scoped lang="scss">
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  z-index: 1000;

  &__content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
  }
}


</style>