<template>
  <div class="app">
    <nav class="navbar">
      <div class="container">
        <h1 class="logo">Task Manager</h1>
        <div class="nav-links">
          <template v-if="!isAuthenticated">
            <button @click="showLogin = true" class="btn-link">Login</button>
            <button @click="showRegister = true" class="btn-link">
              Register
            </button>
          </template>
          <template v-else>
            <span class="user-name">Welcome, {{ user?.name }}</span>
            <button @click="logout" class="btn-link">Logout</button>
          </template>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <slot />
    </main>

    <!-- Login Modal -->
    <div v-if="showLogin" class="modal" @click.self="showLogin = false">
      <div class="modal-content">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <input
            type="email"
            v-model="loginForm.email"
            placeholder="Email"
            required
          />
          <input
            type="password"
            v-model="loginForm.password"
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
          <button type="button" @click="showLogin = false">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Register Modal -->
    <div v-if="showRegister" class="modal" @click.self="showRegister = false">
      <div class="modal-content">
        <h2>Register</h2>
        <form @submit.prevent="handleRegister">
          <input
            type="text"
            v-model="registerForm.name"
            placeholder="Name"
            required
          />
          <input
            type="email"
            v-model="registerForm.email"
            placeholder="Email"
            required
          />
          <input
            type="password"
            v-model="registerForm.password"
            placeholder="Password"
            required
          />
          <button type="submit">Register</button>
          <button type="button" @click="showRegister = false">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const showLogin = ref(false);
const showRegister = ref(false);
const loginForm = ref({ email: "", password: "" });
const registerForm = ref({ name: "", email: "", password: "" });

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

const handleLogin = async () => {
  const success = await authStore.login(loginForm.value);
  if (success) {
    showLogin.value = false;
    loginForm.value = { email: "", password: "" };
  }
};

const handleRegister = async () => {
  const success = await authStore.register(registerForm.value);
  if (success) {
    showRegister.value = false;
    registerForm.value = { name: "", email: "", password: "" };
    showLogin.value = true;
  }
};

const logout = () => {
  authStore.logout();
};
</script>

<style scoped>
.navbar {
  background: #2c3e50;
  color: white;
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  margin: 0;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn-link {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
}

.btn-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.user-name {
  margin-right: 1rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
}

.modal-content h2 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.modal-content input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.modal-content button {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-content button[type="submit"] {
  background: #2c3e50;
  color: white;
}

.modal-content button[type="submit"]:hover {
  background: #34495e;
}

.modal-content button[type="button"] {
  background: #95a5a6;
  color: white;
}

.modal-content button[type="button"]:hover {
  background: #7f8c8d;
}
</style>
