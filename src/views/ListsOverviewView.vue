<template>
  <div>
    <PageTitle
      title="Your lists"
      subtitle="Keep separate lists for different stores, trips, or routines."
    >
      <template #actions>
        <router-link class="btn btn-primary" to="/lists/new">New list</router-link>
      </template>
    </PageTitle>

    <div v-if="shoppingListsStore.lists.length === 0" class="alert alert-info">
      No lists yet. Create your first list to get started.
    </div>

    <div class="row g-3">
      <div
        v-for="list in shoppingListsStore.sortedLists"
        :key="list.id"
        class="col-12 col-md-6 col-lg-4"
      >
        <ShoppingListCard
          :list="list"
          :stats="shoppingListsStore.listStatsById(list.id)"
          @open="openList"
          @edit="editList"
          @delete="requestDelete"
        />
      </div>
    </div>

    <ConfirmDialog
      :open="deleteDialog.open"
      title="Delete list"
      message="This will remove the list and all its items. This cannot be undone."
      confirm-text="Delete list"
      @cancel="closeDelete"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script>
import { useShoppingListsStore } from '@/stores/shoppingStore'

import ConfirmDialog from '@/components/ConfirmDialog.vue'
import PageTitle from '@/components/PageTitle.vue'
import ShoppingListCard from '@/components/ShoppingListCard.vue'

export default {
  name: 'ListsOverviewView',
  components: {
    ConfirmDialog,
    PageTitle,
    ShoppingListCard
  },
  data() {
    return {
      deleteDialog: {
        open: false,
        listId: null
      },
      shoppingListsStore: useShoppingListsStore()
    }
  },
  methods: {
    openList(listId) {
      this.shoppingListsStore.setLastOpenedList(listId)
      this.$router.push({ name: 'list', params: { listId } })
    },
    editList(listId) {
      this.$router.push({ name: 'list-edit', params: { listId } })
    },
    requestDelete(listId) {
      this.deleteDialog.open = true
      this.deleteDialog.listId = listId
    },
    closeDelete() {
      this.deleteDialog.open = false
      this.deleteDialog.listId = null
    },
    confirmDelete() {
      if (this.deleteDialog.listId) {
        this.shoppingListsStore.deleteList(this.deleteDialog.listId)
      }
      this.closeDelete()
    }
  }
}
</script>
