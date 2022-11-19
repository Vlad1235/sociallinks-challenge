<template>
  <div class="container">
    <div class="main__wrapper">
      <my-map-component/>
      <my-side-bar-component/>
    </div>
    <my-pagination v-show="getPaginationVisible"/>
  </div>
  <my-dialog>
    <user-form-component/>
  </my-dialog>
</template>

<script>
import MySideBarComponent from "@/components/MySideBarComponent";
import MyMapComponent from "@/components/MyMapComponent";
import UserFormComponent from "@/components/UserFormComponent";
import {mapGetters} from "vuex";
import MyDialog from "@/components/ui/MyDialog";
import MyPagination from "@/components/ui/MyPagination";
import {GET_ALL_USERS} from "@/store/actions/users/users";


export default {
  name: "MyMainPage",
  components: {MyPagination, MyDialog, MySideBarComponent, MyMapComponent, UserFormComponent},
  computed: {
    ...mapGetters(['getPaginationVisible', 'getAllUsersByPage']),
  },
  created() {
    this.$store.dispatch(GET_ALL_USERS)
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>

.container {
  padding: 40px;
  width: 1140px;
  margin: 0 auto;
}

.main__wrapper {
  padding: 20px;
  display: grid;
  grid-template-columns: 700px 300px;
  grid-template-rows: minmax(245px, auto) minmax(255px, auto);
  grid-auto-rows: minmax(245px, auto);
  column-gap: 40px;
  row-gap: 10px;
  justify-content: center;
}

@media (max-width: 992px) {

  .container {
    padding: 20px;
    width: 992px;
    margin: 0 auto;
  }

  .main__wrapper {
    padding: 20px;
    display: grid;
    grid-template-columns: 600px 200px;
    grid-template-rows: minmax(245px, auto) minmax(255px, auto);
    grid-auto-rows: minmax(245px, auto);
    column-gap: 40px;
    row-gap: 10px;
    justify-content: center;
  }


}

@media (max-width: 768px) {

  .container {
    padding: 20px;
    width: 768px;
    margin: 0 auto;
  }

  .main__wrapper {
    padding: 20px;
    display: grid;
    grid-template-columns: 500px 200px;
    grid-template-rows: minmax(245px, auto) minmax(255px, auto);
    grid-auto-rows: minmax(245px, auto);
    column-gap: 30px;
    row-gap: 10px;
    justify-content: center;
  }

}

@media (max-width: 425px) {

  .container {
    padding: 10px;
    width: 400px;
    margin: 0 auto;
  }

  .main__wrapper {
    display: grid;
    grid-template-columns: 300px;
    grid-template-rows: minmax(300px, auto);
    grid-auto-rows: minmax(300px, auto);
    justify-content: center;
  }

}

</style>