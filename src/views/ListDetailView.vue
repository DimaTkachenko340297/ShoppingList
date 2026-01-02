<template>
  <div>
    <div class="mb-3">
      <router-link class="text-decoration-none" to="/">← Back to lists</router-link>
    </div>

    <PageTitle
      v-if="list"
      :title="list.name"
      :subtitle="list.note || 'Manage items and mark them as purchased.'"
    >
      <template #actions>
        <router-link
          class="btn btn-outline-secondary"
          :to="{ name: 'list-edit', params: { listId: list.id } }"
        >
          Edit list
        </router-link>
      </template>
    </PageTitle>

    <div v-else class="alert alert-warning">
      This list does not exist.
    </div>

    <div v-if="list" class="row g-3">
      <div class="col-12 col-lg-5">
        <AddItemForm @add="addItem" />

        <div class="card border-0 shadow-sm mt-3">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div>
                <div class="fw-semibold">Progress</div>
                <small class="text-muted">{{ stats.purchased }} / {{ stats.total }} purchased</small>
              </div>
              <div class="text-end">
                <div class="fw-semibold">Pending</div>
                <small class="text-muted">{{ stats.total - stats.purchased }}</small>
              </div>
            </div>
            <div class="progress mt-3" style="height: 10px;">
              <div
                class="progress-bar"
                role="progressbar"
                :style="{ width: progressPercent + '%' }"
                :aria-valuenow="progressPercent"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div> 
      </div>

      <div class="col-12 col-lg-7">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div v-if="list.items.length === 0" class="text-muted">
              Your list is empty. Add an item on the left.
            </div>

            <div v-else class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th style="width: 1px"></th>
                    <th>Item</th>
                    <th class="text-end" style="width: 1px"></th>
                  </tr>
                </thead>
                <tbody>
                  <ListItemRow
                    v-for="item in list.items"
                    :key="item.id"
                    :item="item"
                    @toggle="togglePurchased"
                    @delete="requestDeleteItem"
                    @update="updateItem"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ConfirmDialog
      :open="deleteItemDialog.open"
      title="Delete item"
      message="This will remove the item from the list."
      confirm-text="Delete item"
      @cancel="closeDeleteItem"
      @confirm="confirmDeleteItem"
    />
  </div>
</template>

<script>
import { useShoppingListsStore } from '@/stores/shoppingStore'

import AddItemForm from '@/components/AddItemForm.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import ListItemRow from '@/components/ListItemRow.vue'
import PageTitle from '@/components/PageTitle.vue'

export default {
  name: 'ListDetailView',
  components: {
    AddItemForm,
    ConfirmDialog,
    ListItemRow,
    PageTitle
  },
  data() {
    return {
      deleteItemDialog: {
        open: false,
        itemId: null
      },
      shoppingListsStore: useShoppingListsStore()
    }
  },
  computed: {
    listId() {
      return String(this.$route.params.listId || '')
    },
    list() {
      return this.shoppingListsStore.getListById(this.listId)
    },
    stats() {
      return this.shoppingListsStore.listStatsById(this.listId)
    },
    progressPercent() {
      if (!this.stats.total) return 0
      return Math.round((this.stats.purchased / this.stats.total) * 100)
    }
  },
  methods: {
    addItem(payload) {
      this.shoppingListsStore.addItem(this.listId, payload)
    },
    togglePurchased(itemId) {
      this.shoppingListsStore.togglePurchased(this.listId, itemId)
    },
    updateItem(itemId, patch) {
      this.shoppingListsStore.updateItem(this.listId, itemId, patch)
    },
    requestDeleteItem(itemId) {
      this.deleteItemDialog.open = true
      this.deleteItemDialog.itemId = itemId
    },
    closeDeleteItem() {
      this.deleteItemDialog.open = false
      this.deleteItemDialog.itemId = null
    },
    confirmDeleteItem() {
      if (this.deleteItemDialog.itemId) {
        this.shoppingListsStore.deleteItem(this.listId, this.deleteItemDialog.itemId)
      }
      this.closeDeleteItem()
    }
  }
}
</script>
