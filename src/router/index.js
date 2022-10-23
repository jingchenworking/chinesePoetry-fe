import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/pages/PoemHome.vue";
import PoemAbout from "@/pages/PoemAbout.vue";
import PoemVisual from "@/pages/PoemVisual.vue";
import PoemSearch from "@/pages/PoemSearch.vue";

//创建一个路由器
const router = createRouter({
    history: createWebHistory(),

    routes:[
        {
            name: 'home',
            path:'/home',
            component:HomePage,
        },
        {
            name: 'visual',
            path:'/visual',
            component:PoemVisual,
            meta: { bgColor: '#babaaa' }
        },
        {
            name: 'about',
            path: '/about',
            component: PoemAbout,
            meta: { bgColor: '#babaaa' }
        },
        {
            name:'search',
            path: '/search',
            component:PoemSearch,
        }
    ]
})

export default router