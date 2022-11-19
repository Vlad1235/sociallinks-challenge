<template>
  <div class="my-sidebar">
    <div class="my-sidebar__btn">
      <v-btn variant="tonal" color="blue" @click="showDialog">Создать пользователя</v-btn>
    </div>
    <user-list-component/>
  </div>
</template>

<script>
import UserListComponent from "@/components/UserListComponent";
import {SHOW_MODAL} from "@/store/actions/users/users";

export default {
  name: "MySideBarComponent",
  components: {UserListComponent},
  methods: {
    showDialog() {
      this.$store.dispatch(SHOW_MODAL);
    }
  }
}
</script>

<style scoped lang="scss">
.my-sidebar {
  grid-row: 1/3;

  &__btn {
    margin: 15px 0px;
    display: flex;
  }
}
</style>