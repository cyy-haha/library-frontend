import { createApp } from 'vue';  // 從 Vue 3 中引入 createApp
import App from './App.vue';
import axios from 'axios';
import router from './router';  // 正確引入 router

// 創建 Vue 應用程序實例
const app = createApp(App);

// 設置 Axios 基本配置
axios.defaults.baseURL = 'http://localhost:8080/api'; // 將 baseURL 設為後端 API 的根路徑
app.config.globalProperties.$http = axios;  // 在 Vue 3 中使用 config.globalProperties 來注入全局變量

// 使用 router 插件
app.use(router);

// 挂載應用到 DOM
app.mount('#app');
