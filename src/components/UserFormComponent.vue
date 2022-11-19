<template>
  <v-form @submit.prevent v-model="valid" class="form" ref="form">
    <h4>Создание пользователя</h4>
    <v-container>
      <v-row>
        <v-text-field
            class="form__input"
            v-model="user.name"
            :rules="notNullRules"
            label="Имя"
            required
        />

        <v-text-field
            class="form__input"
            v-model="user.username"
            :rules="notNullRules"
            label="Фамилия"
            required
        />

        <v-text-field
            class="form__input"
            v-model="user.email"
            :rules="notNullRules"
            label="E-mail"
            required
        />
        <v-text-field
            class="form__input"
            v-model="user.phone"
            label="Телефон"
            :rules="notNullRules"
            required
        />
        <v-text-field
            class="form__input"
            v-model="user.address.geo.lat"
            type="number"
            label="Широта"
            :rules="notNullRules"
            required
        />
        <v-text-field
            class="form__input"
            v-model="user.address.geo.lng"
            label="Долгота"
            type="number"
            :rules="notNullRules"
            required
        />
      </v-row>
    </v-container>
    <v-btn variant="tonal" color="blue" :disabled="!valid" @click.prevent="createUser">Создать пользователя</v-btn>
  </v-form>
</template>

<script>

import {CREATE_USER, HIDE_MODAL} from "@/store/actions/users/users";

export default {
  name: "UserFormComponent",
  props: {},
  computed: {},
  data() {
    return {
      user: {
        id: null,
        name: '',
        username: '',
        email: '',
        phone: '',
        address: {
          geo: {
            lat: 0,
            lng: 0
          }
        }
      },
      valid: false,
      notNullRules: [
        v => !!v || 'Обязательно к заполнению',
      ]
    }
  },
  methods: {
    createUser() {
      this.$store.dispatch(CREATE_USER, {
        id: Math.ceil(Math.random() * 1000000) + 10,
        name: this.user.name,
        username: this.user.username,
        email: this.user.email,
        phone: this.user.phone,
        address: {
          geo: {
            lat: this.user.address.geo.lat,
            lng: this.user.address.geo.lng
          }
        }
      });
      this.$store.dispatch(HIDE_MODAL);
      this.user.name = '';
      this.user.username = '';
      this.user.email = '';
      this.user.phone = '';
      this.user.address = {
        geo: {
          lat: 0,
          lng: 0
        }
      };
      this.$refs.form.reset()
    },
  }
}
</script>

<style scoped lang="scss">
.form {
  width: 400px;
  display: flex;
  flex-direction: column;

  &__input {
    height: 100%;
    width: 100%;
  }
}

</style>