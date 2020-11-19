import Vue from "vue"
import Parent from "./components/Aparent.vue"
import App from "./components/App.vue"
import vuetify from "./plugins/vuetify.js"

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(Parent)
}).$mount('#app')