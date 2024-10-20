<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="navbar-logo">Library System</div>
      <div class="navbar-links">
        <router-link to="/login" class="navbar-link">Login</router-link>
        <router-link to="/register" class="navbar-link">Register</router-link>
      </div>
    </nav>

    <!-- Router View to load page content -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* Overall container */
#app {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Navbar styling */
.navbar {
  background-color: #4CAF50;
  color: white;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Navbar logo styling */
.navbar-logo {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
}

/* Navbar links styling */
.navbar-links {
  display: flex;
  gap: 20px;
}

.navbar-link {
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 8px 15px;
  border-radius: 4px;
  transition: background-color 0.3s, transform 0.3s;
}

.navbar-link:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.navbar-link:focus {
  outline: none;
  background-color: #388e3c;
}

/* Main content styling */
.router-view {
  flex-grow: 1;
  padding: 20px;
}

/* Optional: Style to make sure the page has a full height */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-size: 16px;
}
</style>
