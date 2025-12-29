<template>
  <div v-if="open" class="modal-backdrop-custom">
    <div class="modal d-block" tabindex="-1" role="dialog" aria-modal="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="$emit('cancel')"></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">{{ message }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" @click="$emit('cancel')">
              Cancel
            </button>
            <button type="button" class="btn btn-danger" @click="$emit('confirm')">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    open: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: 'Please confirm'
    },
    message: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: 'Delete'
    }
  },
  emits: ['confirm', 'cancel']
}
</script>

<style scoped>
.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1050;
}
</style>
