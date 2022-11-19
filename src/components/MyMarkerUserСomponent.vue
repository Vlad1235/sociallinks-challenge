<template>
  <div class="leaflet-user">
    <div>
      <div><strong>Имя: </strong>{{ user.name }}</div>
      <div><strong>Фамилия: </strong>{{ user.username }}</div>
      <div><strong>Имейл: </strong>{{ user.email }}</div>
      <div><strong>Адрес: </strong>{{ getAddress ?? 'N/A' }}</div>
      <div><strong>Вебсайт: </strong>{{ user?.website ?? "N/A" }}</div>
      <div><strong>Телефон: </strong>{{ user.phone }}</div>
      <div><strong>Имя компании: </strong>{{ user?.company?.name ?? "N/A" }}</div>
    </div>
    <div style="text-align: center; cursor: pointer; color: blue; font-weight: bold; padding-top: 5px">
      <v-btn @click="this.triggerHighlight">Highlight</v-btn>
    </div>
  </div>
</template>

<script>
import {SELECT_USER} from "@/store/actions/users/users";

export default {
  name: "MyMarkerUser",
  props: {
    user: {
      type: Object,
      required: true
    },
    store: {
      type: Object,
      required: true
    }
  },
  computed: {
    getAddress(){
      const {address: {city, street, suite, zipcode}} = this.user;
      return city && street && suite && zipcode ? zipcode + '/' + city + '/' + street + '/' + suite : 'N/A';
    }
  },
  data() {
    return {}
  },
  methods: {
    triggerHighlight(){
      this.store.dispatch(SELECT_USER, this.user)
    }
  }
}
</script>

<style scoped>
.leaflet-user {
  padding: 5px;
}

</style>