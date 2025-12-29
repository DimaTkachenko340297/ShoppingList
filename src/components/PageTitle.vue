<template>
  <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-3">
    <div>
      <h1 class="h3 mb-1">{{ title }}</h1>
      <p v-if="subtitle" class="text-muted mb-0">{{ subtitle }}</p>
    </div>

    <div v-if="$slots.actions" class="d-flex gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>
