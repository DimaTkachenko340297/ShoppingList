import { createRouter, createWebHistory } from 'vue-router'

import AboutView from '../views/AboutView.vue'
import ListsOverviewView from '../views/ListsOverviewView.vue'

const routes = [
  { path: '/', name: 'lists', component: ListsOverviewView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router