import { createRouter, createWebHistory } from 'vue-router'

import AboutView from '../views/AboutView.vue'
import ListDetailView from '../views/ListDetailView.vue'
import ListEditorView from '../views/ListEditorView.vue'
import ListsOverviewView from '../views/ListsOverviewView.vue'

const routes = [
  { path: '/', name: 'lists', component: ListsOverviewView },
  { path: '/lists/new', name: 'list-new', component: ListEditorView },
  { path: '/lists/:listId', name: 'list', component: ListDetailView, props: true },
  { path: '/lists/:listId/edit', name: 'list-edit', component: ListEditorView, props: true },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router