<template>
  <div class="home">
    <h2>Active Items ({{ store.activeItems.length }})</h2>
    
    <ul class="item-list" v-if="store.activeItems.length > 0">
      <li v-for="item in store.activeItems" :key="item.id" class="item">
        <span class="quantity">{{ item.quantity }}x</span>
        <span class="name">{{ item.name }}</span>
      </li>
    </ul>
    
    <p v-else>No active items yet. Go to "Add Item" to add some!</p>
  </div>
</template>

<script>
import { useShoppingStore } from '@/stores/shoppingStore'

export default {
  name: 'HomeView',
  setup() {
    const store = useShoppingStore()
    return { store }
  }
}
</script>

<style scoped>
.item-list {
  list-style: none;
  max-width: 600px;
  margin: 2rem auto;
}

.item {
  background: white;
  padding: 1rem 1.5rem;
  margin-bottom: 0.8rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  font-size: 1.1rem;
}

.quantity {
  font-weight: bold;
  color: #6366f1;
  margin-right: 1rem;
  min-width: 50px;
}

.name {
  flex-grow: 1;
}
</style>