import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import App from '../App.vue';
import DashBoard from '../pages/DashBoard.vue';
const routes=[


    {
        path:"/login",
        name:"Login",
        component:Login
    },
    {
        path:"/admin",
        name:"Dashboard",
        component:DashBoard
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
}

);
export default router; 