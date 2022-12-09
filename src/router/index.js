import { createRouter, createWebHistory } from 'vue-router/dist/vue-router.esm-bundler'
import Home from '../components/Home.vue'
import Faculties from "../components/Faculties.vue";
import Departments from "../components/Departments.vue";
import Groups from "../components/Groups.vue";
import Students from "../components/Students.vue";
import Teachers from "../components/Teachers.vue";
import Subjects from "../components/Subjects.vue";
import Faq from "../components/Faq.vue";

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/faculties',
        component: Faculties
    },
    {
        path: '/departments',
        component: Departments
    },
    {
        path: '/groups',
        component: Groups
    },
    {
        path: '/students',
        component: Students
    },
    {
        path: '/teachers',
        component: Teachers
    },
    {
        path: '/subjects',
        component: Subjects
    },
    {
        path: '/faq',
        component: Faq
    }
]

export default () => createRouter({
    history: createWebHistory(),
    routes: routes
})