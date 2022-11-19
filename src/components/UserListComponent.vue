<template>
  <div v-for="user in getAllUsersByPage" :key="user.id">
    <user-item-component :user="user" :is-selected="checkIfUserIsSelected(user)"/>
  </div>
</template>

<script>

import UserItemComponent from "@/components/UserItemComponent";
import {mapGetters} from "vuex";
import {toRaw} from "vue";

export default {
  name: "UserListComponent",
  components: {UserItemComponent},
  computed: {
    ...mapGetters(['getAllUsersByPage', 'getTotalPages', 'getIsUsersLoading', 'getDialogVisible', 'getSelectedUser']),
  },
  data() {
    return {}
  },
  methods: {
    checkIfUserIsSelected(user) {
      return Object.is(user.id, this.getSelectedUser.id)
    }
  },
  watch: {
    getAllUsersByPage(newValue) {
      console.log(toRaw(newValue));
    },
  }
}
</script>

<style scoped>

</style>