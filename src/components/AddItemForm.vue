<template>
  <form class="card border-0 shadow-sm" @submit.prevent="submit">
    <div class="card-body">
      <div class="row g-2 align-items-end">
        <div class="col-12 col-md-6">
          <label class="form-label" for="itemName">Item</label>
          <input
            id="itemName"
            v-model.trim="draft.name"
            class="form-control"
            type="text"
            placeholder="e.g., Pasta"
            required
          />
        </div>

        <div class="col-6 col-md-3">
          <label class="form-label" for="itemQty">Quantity</label>
          <input
            id="itemQty"
            v-model.number="draft.quantity"
            class="form-control"
            type="number"
            min="1"
            step="1"
            required
          />
        </div>

        <div class="col-6 col-md-3">
          <label class="form-label" for="itemUnit">Unit</label>
          <select id="itemUnit" v-model="draft.unit" class="form-select">
            <option value="pcs">pcs</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="l">l</option>
            <option value="pack">pack</option>
          </select>
        </div>

        <div class="col-12">
          <button class="btn btn-success w-100" type="submit" :disabled="!canSubmit">
            Add item
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'AddItemForm',
  emits: ['add'],
  data() {
    return {
      draft: {
        name: '',
        quantity: 1,
        unit: 'pcs'
      }
    }
  },
  computed: {
    canSubmit() {
      return this.draft.name.length > 0 && Number.isFinite(this.draft.quantity) && this.draft.quantity >= 1
    }
  },
  methods: {
    submit() {
      if (!this.canSubmit) return

      this.$emit('add', {
        name: this.draft.name,
        quantity: this.draft.quantity,
        unit: this.draft.unit
      })

      this.draft.name = ''
      this.draft.quantity = 1
      this.draft.unit = 'pcs'
    }
  }
}
</script>
