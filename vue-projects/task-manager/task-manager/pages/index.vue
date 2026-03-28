<template>
  <div class="tasks-container">
    <h2>My Tasks</h2>

    <div v-if="isAuthenticated">
      <div class="add-task">
        <input
          type="text"
          v-model="newTask.title"
          placeholder="What needs to be done?"
          @keyup.enter="addTask"
        />
        <button @click="addTask">Add Task</button>
      </div>

      <div class="tasks-list" v-if="tasks.length > 0">
        <div v-for="task in tasks" :key="task.id" class="task-item">
          <input
            type="checkbox"
            :checked="task.status === 'completed'"
            @change="toggleTaskStatus(task)"
          />
          <span :class="{ completed: task.status === 'completed' }">
            {{ task.title }}
          </span>
          <button @click="deleteTask(task.id)" class="delete-btn">
            Delete
          </button>
        </div>
      </div>

      <div v-else class="no-tasks">
        <p>No tasks yet. Add your first task above!</p>
      </div>
    </div>

    <div v-else class="login-prompt">
      <p>👋 Please login or register to manage your tasks</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const tasks = ref([]);
const newTask = ref({ title: "" });

const getAuthHeader = () => {
  return {
    Authorization: `Bearer ${authStore.token}`,
  };
};

const fetchTasks = async () => {
  if (!isAuthenticated.value) return;

  try {
    const response = await $fetch("/api/tasks", {
      headers: getAuthHeader(),
    });
    tasks.value = response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    if (error.statusCode === 401) {
      authStore.logout();
    }
  }
};

const addTask = async () => {
  if (!newTask.value.title.trim()) return;

  try {
    const response = await $fetch("/api/tasks", {
      method: "POST",
      headers: getAuthHeader(),
      body: { title: newTask.value.title },
    });

    if (response.success) {
      tasks.value.unshift(response.data);
      newTask.value.title = "";
    }
  } catch (error) {
    console.error("Error adding task:", error);
    alert("Failed to add task");
  }
};

const toggleTaskStatus = async (task) => {
  const newStatus = task.status === "pending" ? "completed" : "pending";

  try {
    const response = await $fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: { status: newStatus },
    });

    if (response.success) {
      task.status = newStatus;
    }
  } catch (error) {
    console.error("Error updating task:", error);
    alert("Failed to update task");
  }
};

const deleteTask = async (taskId) => {
  if (!confirm("Are you sure you want to delete this task?")) return;

  try {
    const response = await $fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });

    if (response.success) {
      tasks.value = tasks.value.filter((t) => t.id !== taskId);
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    alert("Failed to delete task");
  }
};

watch(isAuthenticated, (newVal) => {
  if (newVal) {
    fetchTasks();
    fetchTasks();
  } else {
    tasks.value = [];
  }
});

onMounted(() => {
  if (isAuthenticated.value) {
    fetchTasks();
  }
});
</script>

<style scoped>
.tasks-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.tasks-container h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.add-task {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-task input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.add-task input:focus {
  outline: none;
  border-color: #2c3e50;
}

.add-task button {
  padding: 10px 20px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.add-task button:hover {
  background: #34495e;
}

.tasks-list {
  margin-top: 20px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid #eee;
  margin-bottom: 10px;
  border-radius: 4px;
  background: white;
  transition: all 0.3s;
}

.task-item:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.task-item span {
  flex: 1;
  font-size: 16px;
}

.task-item span.completed {
  text-decoration: line-through;
  color: #95a5a6;
}

.delete-btn {
  padding: 5px 12px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.delete-btn:hover {
  background: #c0392b;
}

.no-tasks {
  text-align: center;
  color: #95a5a6;
  padding: 40px;
  background: #f9f9f9;
  border-radius: 8px;
}

.login-prompt {
  text-align: center;
  padding: 60px 20px;
  background: #ecf0f1;
  border-radius: 8px;
  margin-top: 20px;
}

.login-prompt p {
  font-size: 18px;
  color: #2c3e50;
}
</style>
