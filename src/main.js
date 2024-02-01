import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style/global.css"
import ElementUI from "element-ui";
import _ from 'lodash'
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI, { size: "medium", zIndex: 3000 });
Vue.config.productionTip = false;
Vue.prototype._ = _;
import Components from "./components";

import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

Vue.use(Components);

import JsonCSV from "vue-json-csv";
Vue.component("downloadCsv", JsonCSV);

import "github-markdown-css/github-markdown.css";

import "@/style/index.scss";
import "@/utils/directives";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
