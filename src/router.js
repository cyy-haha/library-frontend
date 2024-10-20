import UserLogin from './components/Login.vue';
import BorrowBook from './components/BorrowBook.vue';
import Register from './components/Register.vue';  // 新增註冊頁面組件

import { createRouter, createWebHistory } from 'vue-router';  // Vue 3 中應該使用 createRouter 和 createWebHistory

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: UserLogin,
  },
  {
    path: '/borrow',
    name: 'BorrowBook',
    component: BorrowBook
  },
  {
    path: '/register',  // 註冊頁面的路徑
    name: 'Register',
    component: Register
  }
];

const router = createRouter({
  history: createWebHistory(),  // Vue 3 中使用 createWebHistory
  routes,
});

export default router;


