<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <h1>Shopping List</h1>
        <nav class="nav">
          <router-link to="/" active-class="active">Home</router-link>
          <router-link to="/add" active-class="active">Add Item</router-link>
          <router-link to="/completed" active-class="active">Completed</router-link>
          <router-link to="/settings" active-class="active">Settings</router-link>
        </nav>
      </div>
    </header>

    <main class="main container">
      <router-view />
    </main>

    <footer class="footer">
      <div class="container">
        <p>© 2025 Shopping List App</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  background-color: #1e293b;
  color: white;
  padding: 1.5rem 0;
  width: 100%;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-size: 1.8rem;
}

.nav a {
  color: white;
  text-decoration: none;
  margin-left: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.3s;
}

.nav a:hover,
.nav a.active {
  background-color: rgba(255, 255, 255, 0.15);
}

.main {
  min-height: 70vh;
  padding: 2rem 0;
}

.footer {
  background-color: #e2e8f0;
  color: #64748b;
  text-align: center;
  padding: 1.5rem 0;
  margin-top: auto;
}
</style>