<template>
  <div class="text-center">
    <v-pagination
        v-model="page"
        :length="this.getTotalPages"
        total-visible="10"
    ></v-pagination>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {CHANGE_PAGE} from "@/store/actions/users/users";

export default {
  name: "MyPagination",
  computed: {
    ...mapGetters(['getTotalPages']),
  },
  data(){
    return {
      page: 1,
    }
  },
  methods: {

  },
  watch:{
    page(pageNumber){
      this.$store.dispatch(CHANGE_PAGE, pageNumber);
    }
  }
}
</script>

<style scoped lang="scss">

</style>