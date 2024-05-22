import { createApp } from "vue";
import "./styles/global.scss";
import App from "./App.vue";
import router from "./router";
import { Ion } from "cesium";

window.CESIUM_BASE_URL = "/Cesium/";
// Your access token can be found at: https://ion.cesium.com/tokens.
// Replace `your_access_token` with your Cesium ion access token.
Ion.defaultAccessToken = "your_access_token";

createApp(App).use(router).mount("#app");
