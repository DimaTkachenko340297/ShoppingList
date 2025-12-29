<template>
  <nav class="navbar navbar-expand-lg bg-white border-bottom">
    <div class="container">
      <router-link class="navbar-brand fw-semibold" to="/">
        ShoppingList
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#appNavbar"
        aria-controls="appNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="appNavbar" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" active-class="active">Lists</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/lists/new" active-class="active">New list</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" active-class="active">About</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>
