<template>
  <div class="task-form">
    <input
      v-model="newTaskTitle"
      @keyup.enter="addTask"
      type="text"
      placeholder="Enter a new task..."
      class="task-input"
    />
    <button @click="addTask" class="add-btn">Add Task</button>
  </div>
</template>

<script>
export default {
  name: "TaskForm",
  data() {
    return {
      newTaskTitle: "",
    };
  },
  methods: {
    addTask() {
      if (this.newTaskTitle.trim()) {
        this.$emit("add-task", this.newTaskTitle.trim());
        this.newTaskTitle = "";
      }
    },
  },
};
</script>

<style scoped>
.task-form {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.task-input {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.task-input:focus {
  outline: none;
  border-color: #42b983;
}

.add-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #359268;
}
</style>
