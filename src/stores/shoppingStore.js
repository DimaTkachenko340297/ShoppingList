import { defineStore } from 'pinia'

export const useShoppingStore = defineStore('shopping', {
  state: () => ({
    items: [
      { id: 1, name: 'Milk', quantity: 2, completed: false },
      { id: 2, name: 'Bread', quantity: 1, completed: false },
      { id: 3, name: 'Eggs', quantity: 12, completed: true },
      { id: 4, name: 'Apples', quantity: 6, completed: false },
    ]
  }),
  getters: {
    activeItems: (state) => state.items.filter(item => !item.completed),
    completedItems: (state) => state.items.filter(item => item.completed)
  }
})