import {createApp} from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import my_components from '@/components/ui'
import store from "@/store";

const app = createApp(App);

my_components.forEach(item => {
    app.component(item.name, item)
})

const vuetify = createVuetify({
    components,
    directives,
})

app
    .use(store)
    .use(vuetify)
    .mount('#app')

app.config.globalProperties.$store=store
