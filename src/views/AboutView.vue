<template>
  <div>
    <PageTitle
      title="About"
      subtitle="A tiny personal shopping list manager built with Vue 3 + Pinia + Vue Router."
    />

    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <p class="mb-2">
          ShoppingList is designed to stay simple:
        </p>
        <ul class="mb-3">
          <li>Create multiple lists</li>
          <li>Add, edit, and delete items</li>
          <li>Mark items as purchased</li>
          <li>Everything is stored locally in your browser</li>
        </ul>
        <p class="mb-0 text-muted">
          Tip: You can keep separate lists for different stores or routines (e.g., "Pharmacy", "Weekly groceries").
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue'

export default {
  name: 'AboutView',
  components: {
    PageTitle
  }
}
</script>
