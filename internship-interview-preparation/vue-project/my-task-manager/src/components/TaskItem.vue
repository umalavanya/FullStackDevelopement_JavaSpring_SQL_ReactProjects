<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <input
      type="checkbox"
      :checked="task.completed"
      @change="$emit('toggle-task', task.id)"
    />
    <span class="task-title">{{ task.title }}</span>
    <button @click="$emit('delete-task', task.id)" class="delete-btn">
      Delete
    </button>
  </div>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  emits: ["toggle-task", "delete-task"],
};
</script>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin: 8px 0;
  background-color: #f5f5f5;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.task-item:hover {
  background-color: #e8e8e8;
  transform: translateX(5px);
}

.task-item.completed {
  background-color: #e0ffe0;
  opacity: 0.7;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #666;
}

.task-title {
  flex: 1;
  margin-left: 12px;
  font-size: 16px;
}

.delete-btn {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #cc0000;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
