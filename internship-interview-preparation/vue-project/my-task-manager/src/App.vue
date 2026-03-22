<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
  background-color: #f0f2f5;
}

#app {
  min-height: 100vh;
}

nav {
  background-color: #2c3e50;
  padding: 15px;
  text-align: center;
  margin-bottom: 30px;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #34495e;
}

nav a.router-link-active {
  background-color: #42b983;
}
</style>
