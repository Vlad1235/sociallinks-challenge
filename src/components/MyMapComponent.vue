<template>
  <div class="my-map">
    <div id="my-leaflet"/>
  </div>
</template>

<script>
import L from 'leaflet';
import {mapGetters} from "vuex";
import {createApp, toRaw} from "vue";
import MyMarkerUser from "@/components/MyMarkerUserСomponent";
import store from "@/store";

export default {
  name: "MyMapComponent",
  computed: {
    ...mapGetters(['getAllUsersByPage', 'getSelectedUser']),
  },
  mounted() {
    if (this.getAllUsersByPage !== undefined && this.getAllUsersByPage.length !== 0) {
      this.createMapLayer()
    }
  },
  data() {
    return {
      mapItem: null,
    }
  },
  methods: {
    createMapLayer() {
      console.log('========createMapLayer===========')
      console.log('this.getAllUsersByPage', toRaw(this.getAllUsersByPage))
      if (this.mapItem !== null) {
        this.mapItem = this.mapItem.remove();
      }
      this.mapItem = L.map('my-leaflet').setView([0, 0], 5);
      L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=DdahMMpeAPPznrP3C8bF', {}).addTo(this.mapItem);
      this.getAllUsersByPage.forEach(user => {
        const {address: {geo: {lat, lng}}} = user;
        var markerOne = L.marker([lat, lng]).addTo(this.mapItem);

        markerOne.bindPopup(this.triggerHighlight(user))
        // markerOne.bindPopup(this.getPopupLayout(user))
      })
    },
    getPopupLayout(user) {
      const {address: {city, street, suite, zipcode}} = user;
      const adrs = city && street && suite && zipcode ? zipcode + '/' + city + '/' + street + '/' + suite : 'N/A';
      return `
<div class="leaflet-user">
    <div>
      <div><strong>Имя: </strong>${user.name}</div>
      <div><strong>Фамилия: </strong>${user.username}</div>
      <div><strong>Имейл: </strong>${user.email}</div>
      <div><strong>Адрес: </strong>${adrs}</div>
      <div><strong>Вебсайт: </strong>${user?.website ?? "N/A"}</div>
      <div><strong>Телефон: </strong>${user.phone}</div>
      <div><strong>Имя компании: </strong>${user?.company?.name ?? "N/A"}</div>
    </div>
    <div style="text-align: center; cursor: pointer; color: red" >
        <button onclick="window.triggerHighlight()">Highlight</button>
    </div>
  </div>
      `
    },
    triggerHighlight(user) {
      const el = document.createElement('div');
      const instance = createApp(MyMarkerUser, {
        user,
        store
      }).mount(el);
      return instance.$el;
    },
  },
  watch: {
    getAllUsersByPage() {
      if (this.getAllUsersByPage !== undefined && this.getAllUsersByPage.length !== 0) {
        this.createMapLayer()
      }
    },
    getSelectedUser() {
      const {address: {geo: {lat, lng}}} = this.getSelectedUser;
      this.mapItem.setView([lat, lng], 5);
      var markerOne = L.marker([lat, lng]).addTo(this.mapItem);
      markerOne.bindPopup(this.triggerHighlight(this.getSelectedUser)).openPopup()
    }
  }
}
</script>

<style scoped lang="scss">


.my-map {
  border: 1px solid $main-color;
  grid-row: 1/3;
}

#my-leaflet {
  height: 100%;
  width: 100%;
}

.leaflet-user {
  padding: 5px;
}

@media (max-width: 992px) {

  .my-map {
    border: 1px solid $main-color;
    grid-row: 1/3;
  }

  #my-leaflet {
    height: 100%;
    width: 100%;
  }

  .leaflet-user {
    padding: 5px;
  }


}

@media (max-width: 768px) {

  .my-map {
    border: 1px solid $main-color;
    grid-row: 1/3;
  }

  #my-leaflet {
    height: 100%;
    width: 100%;
  }

  .leaflet-user {
    padding: 5px;
  }

}

@media (max-width: 425px) {

  .my-map {
    grid-row: 1/1;
  }

  #my-leaflet {
    height: 100%;
    width: 100%;
  }

  .leaflet-user {
    padding: 5px;
  }


}

</style>