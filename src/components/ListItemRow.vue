<template>
  <tr>
    <td style="width: 1px" class="align-middle">
      <input
        class="form-check-input"
        type="checkbox"
        :checked="item.purchased"
        @change="$emit('toggle', item.id)"
        :aria-label="item.purchased ? 'Mark as not purchased' : 'Mark as purchased'"
      />
    </td>

    <td class="align-middle">
      <div v-if="!isEditing" :class="{ 'text-decoration-line-through text-muted': item.purchased }">
        <div class="fw-medium">{{ item.name }}</div>
        <small class="text-muted">{{ item.quantity }} {{ item.unit }}</small>
      </div>

      <div v-else class="row g-2">
        <div class="col-12 col-md-6">
          <input v-model.trim="draft.name" class="form-control form-control-sm" type="text" required />
        </div>
        <div class="col-6 col-md-3">
          <input v-model.number="draft.quantity" class="form-control form-control-sm" type="number" min="1" step="1" />
        </div>
        <div class="col-6 col-md-3">
          <select v-model="draft.unit" class="form-select form-select-sm">
            <option value="pcs">pcs</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="l">l</option>
            <option value="pack">pack</option>
          </select>
        </div>
      </div>
    </td>

    <td class="align-middle text-end" style="width: 1px; white-space: nowrap;">
      <div v-if="!isEditing" class="btn-group btn-group-sm" role="group">
        <button class="btn btn-outline-secondary" type="button" @click="startEdit">Edit</button>
        <button class="btn btn-outline-danger" type="button" @click="$emit('delete', item.id)">Delete</button>
      </div>

      <div v-else class="btn-group btn-group-sm" role="group">
        <button class="btn btn-success" type="button" @click="save" :disabled="!canSave">Save</button>
        <button class="btn btn-outline-secondary" type="button" @click="cancel">Cancel</button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ListItemRow',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['toggle', 'delete', 'update'],
  data() {
    return {
      isEditing: false,
      draft: {
        name: '',
        quantity: 1,
        unit: 'pcs'
      }
    }
  },
  computed: {
    canSave() {
      return this.draft.name.length > 0 && Number.isFinite(this.draft.quantity) && this.draft.quantity >= 1
    }
  },
  methods: {
    startEdit() {
      this.isEditing = true
      this.draft.name = this.item.name
      this.draft.quantity = this.item.quantity
      this.draft.unit = this.item.unit
    },
    cancel() {
      this.isEditing = false
    },
    save() {
      if (!this.canSave) return
      this.$emit('update', this.item.id, {
        name: this.draft.name,
        quantity: this.draft.quantity,
        unit: this.draft.unit
      })
      this.isEditing = false
    }
  }
}
</script>
