import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AddItemView from '../views/AddItemView.vue'
import CompletedView from '../views/CompletedView.vue'
import SettingsView from '../views/SettingsView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/add', name: 'add', component: AddItemView },
  { path: '/completed', name: 'completed', component: CompletedView },
  { path: '/settings', name: 'settings', component: SettingsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router