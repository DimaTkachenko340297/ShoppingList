import { defineStore } from 'pinia';

export const useShoppingStore = defineStore('shopping', {
  state: () => ({
    items: [
      { id: 1, name: 'Milk', quantity: 2, completed: false },
      { id: 2, name: 'Bread', quantity: 1, completed: true },
      { id: 3, name: 'Eggs', quantity: 12, completed: false },
    ]
  }),
  actions: {
    addItem(name, quantity = 1) {
      this.items.push({
        id: Date.now(),
        name,
        quantity,
        completed: false
      });
    },
    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id);
    },
    toggleCompleted(id) {
      const item = this.items.find(item => item.id === id);
      if (item) item.completed = !item.completed;
    }
  },
  getters: {
    activeItems: (state) => state.items.filter(item => !item.completed),
    completedItems: (state) => state.items.filter(item => item.completed),
    totalItems: (state) => state.items.length
  }
});