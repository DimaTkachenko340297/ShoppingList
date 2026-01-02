import { createRouter, createWebHistory } from 'vue-router'

import AboutView from '../views/AboutView.vue'
import ListsOverviewView from '../views/ListsOverviewView.vue'
import ListDetailView from '../views/ListDetailView.vue'
import ListEditorView from '../views/ListEditorView.vue'

const routes = [
  { path: '/', name: 'lists', component: ListsOverviewView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/list/:listId', name: 'list', component: ListDetailView },
  { path: '/list/:listId/edit', name: 'list-edit', component: ListEditorView },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router