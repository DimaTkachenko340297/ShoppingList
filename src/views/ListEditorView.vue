<template>
  <div>
    <div class="mb-3">
      <router-link class="text-decoration-none" to="/">← Back to lists</router-link>
    </div>

    <PageTitle
      :title="isEdit ? 'Edit list' : 'Create a new list'"
      subtitle="A list is a lightweight space for items you want to buy soon."
    />

    <form class="card border-0 shadow-sm" @submit.prevent="save">
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label" for="listName">List name</label>
          <input
            id="listName"
            v-model.trim="draft.name"
            class="form-control"
            type="text"
            placeholder="e.g., Weekly groceries"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label" for="listNote">Short note (optional)</label>
          <input
            id="listNote"
            v-model.trim="draft.note"
            class="form-control"
            type="text"
            placeholder="e.g., Try to keep it under 30€"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Accent color</label>
          <div class="d-flex flex-wrap gap-2">
            <button
              v-for="color in accentOptions"
              :key="color"
              type="button"
              class="btn p-0 border"
              :class="draft.accent === color ? 'border-dark' : 'border-light'"
              style="width: 34px; height: 34px; border-radius: 999px;"
              :style="{ backgroundColor: color }"
              @click="draft.accent = color"
              :aria-label="'Select color ' + color"
            ></button>
          </div>
        </div>

        <div class="d-flex flex-column flex-sm-row gap-2">
          <button class="btn btn-primary" type="submit" :disabled="!canSave">
            {{ isEdit ? 'Save changes' : 'Create list' }}
          </button>
          <router-link class="btn btn-outline-secondary" to="/">Cancel</router-link>
        </div>
      </div>
    </form>

    <div v-if="isEdit && !existingList" class="alert alert-warning mt-3">
      This list does not exist.
    </div>
  </div>
</template>

<script>
import { useShoppingListsStore } from '@/stores/shoppingStore'

import PageTitle from '@/components/PageTitle.vue'

export default {
  name: 'ListEditorView',
  components: {
    PageTitle
  },
  data() {
    return {
      draft: {
        name: '',
        note: '',
        accent: '#0d6efd'
      },
      accentOptions: ['#0d6efd', '#198754', '#dc3545', '#6f42c1', '#fd7e14', '#20c997'],
      shoppingListsStore: useShoppingListsStore()
    }
  },
  computed: {
    listId() {
      return String(this.$route.params.listId || '')
    },
    isEdit() {
      return this.$route.name === 'list-edit'
    },
    existingList() {
      if (!this.isEdit) return null
      return this.shoppingListsStore.getListById(this.listId)
    },
    canSave() {
      return this.draft.name.length > 0
    }
  },
  created() {
    if (this.existingList) {
      this.draft.name = this.existingList.name
      this.draft.note = this.existingList.note || ''
      this.draft.accent = this.existingList.accent || '#0d6efd'
    }
  },
  methods: {
    save() {
      if (!this.canSave) return

      if (this.isEdit) {
        this.shoppingListsStore.updateList(this.listId, this.draft)
        this.$router.push({ name: 'list', params: { listId: this.listId } })
      } else {
        const newId = this.shoppingListsStore.createList(this.draft)
        this.$router.push({ name: 'list', params: { listId: newId } })
      }
    }
  }
}
</script>
