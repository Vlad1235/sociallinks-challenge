<template>
  <div class="user" :class="{'user-selected': isSelected}" @click="selectUser(user)">
    <v-card
        :title="user.name + ' / ' + user.username"
        :subtitle="user.phone"
        :text="user.email"
        elevation="2"
        class="user-card"
    >
      <v-card-actions>
        <v-btn variant="tonal" color="red" @click="deleteUser(user)">Удалить</v-btn>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script>

import {DELETE_USER_BY_ID, SELECT_USER, UNSELECT_USER} from "@/store/actions/users/users";

export default {
  name: "UserItemComponent",
  props: {
    user: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deleteUser(user) {
      this.$store.dispatch(DELETE_USER_BY_ID, user);
    },
    selectUser(user) {
      this.$store.dispatch(UNSELECT_USER);
      this.$store.dispatch(SELECT_USER, user);
    }
  }
}
</script>

<style lang="scss">

.user {
  padding-top: 5px;

  &-selected {
    background-color: aqua;
  }

  &-card {
    cursor:pointer;
  }
}


</style>