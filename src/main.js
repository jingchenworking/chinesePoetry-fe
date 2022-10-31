import { createApp } from 'vue'
import App from './App.vue'
//引入 router
import router from "@/router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

import 'vue-universal-modal/dist/index.css';

import VueUniversalModal from 'vue-universal-modal';

//按需引入element-ui
// import {Row,Button} from 'element-ui';

//关闭生产提示
// createApp(App).config.productionTip = false

// createApp(App).use(createRouter)
// createApp(App).component(Row.name,Row);
// createApp(App).component(Button.name, Button);


createApp(App).use(router).use(ElementPlus).use(VueAwesomePaginate).use(VueUniversalModal, {
    teleportTarget: '#modals',
  }).mount('#app')
