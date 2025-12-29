<template>
  <div class="card card-hover h-100 border-0 shadow-sm">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start gap-2">
        <div>
          <h2 class="h5 mb-1">
            <span
              class="badge rounded-pill me-2 align-middle"
              :style="{ backgroundColor: accentColor }"
            >
              &nbsp;
            </span>
            <span class="align-middle">{{ list.name }}</span>
          </h2>
          <p v-if="list.note" class="text-muted mb-2">{{ list.note }}</p>
          <small class="text-muted">
            {{ stats.purchased }} / {{ stats.total }} purchased
          </small>
        </div>

        <div class="dropdown">
          <button
            class="btn btn-sm btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Actions
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <button class="dropdown-item" type="button" @click="$emit('open', list.id)">
                Open
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button" @click="$emit('edit', list.id)">
                Edit
              </button>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <button class="dropdown-item text-danger" type="button" @click="$emit('delete', list.id)">
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card-footer bg-transparent border-0 pt-0">
      <button class="btn btn-primary w-100" type="button" @click="$emit('open', list.id)">
        Open list
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingListCard',
  props: {
    list: {
      type: Object,
      required: true
    },
    stats: {
      type: Object,
      required: true
    }
  },
  emits: ['open', 'edit', 'delete'],
  computed: {
    accentColor() {
      return this.list.accent || '#0d6efd'
    }
  }
}
</script>
