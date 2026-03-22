<template>
  <div class="home">
    <h1>Task Manager</h1>

    <TaskForm @add-task="addTask" />

    <div class="filters">
      <button
        v-for="filter in filters"
        :key="filter"
        :class="{ active: currentFilter === filter }"
        @click="currentFilter = filter"
        class="filter-btn"
      >
        {{ filter }}
      </button>
    </div>

    <div v-if="filteredTasks.length === 0" class="empty-state">
      <p>No tasks found. Add a new task to get started!</p>
    </div>

    <TaskItem
      v-for="task in filteredTasks"
      :key="task.id"
      :task="task"
      @toggle-task="toggleTask"
      @delete-task="deleteTask"
    />

    <div class="stats">
      <p>Total tasks: {{ tasks.length }}</p>
      <p>Completed: {{ completedTasksCount }}</p>
      <p>Pending: {{ pendingTasksCount }}</p>
    </div>
  </div>
</template>

<script>
import TaskForm from "@/components/TaskForm.vue";
import TaskItem from "@/components/TaskItem.vue";

export default {
  name: "HomeView",
  components: {
    TaskForm,
    TaskItem,
  },
  data() {
    return {
      tasks: [],
      currentFilter: "All",
      filters: ["All", "Active", "Completed"],
    };
  },
  computed: {
    filteredTasks() {
      if (this.currentFilter === "Active") {
        return this.tasks.filter((task) => !task.completed);
      }
      if (this.currentFilter === "Completed") {
        return this.tasks.filter((task) => task.completed);
      }
      return this.tasks;
    },
    completedTasksCount() {
      return this.tasks.filter((task) => task.completed).length;
    },
    pendingTasksCount() {
      return this.tasks.filter((task) => !task.completed).length;
    },
  },
  mounted() {
    this.loadTasks();
  },
  methods: {
    addTask(title) {
      const newTask = {
        id: Date.now(),
        title: title,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      this.tasks.push(newTask);
      this.saveTasks();
    },
    toggleTask(taskId) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        this.saveTasks();
      }
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      this.saveTasks();
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    loadTasks() {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    },
  },
};
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  justify-content: center;
}

.filter-btn {
  padding: 8px 16px;
  border: 2px solid #ddd;
  background-color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn.active {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}

.filter-btn:hover:not(.active) {
  border-color: #42b983;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 20px 0;
}

.stats {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 2px solid #eee;
  display: flex;
  justify-content: space-around;
  color: #666;
  font-size: 14px;
}

.stats p {
  margin: 0;
}
</style>
