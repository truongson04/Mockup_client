import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import App from "../App.vue";
import DashBoard from "../pages/DashBoard.vue";
import Login2 from "../pages/LoginPage2.vue";
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    name: "Dashboard",
    component: DashBoard,
  },
  {
    path: "/login2",
    name: "Login2",
    component: Login2,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
