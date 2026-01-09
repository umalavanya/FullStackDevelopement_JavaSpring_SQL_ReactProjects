import React, { createContext, useState, useContext } from 'react';

const DragAndDropContext = createContext();

export const useDragAndDrop = () => useContext(DragAndDropContext);

export const DragAndDropProvider = ({ children }) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverStatus, setDragOverStatus] = useState(null);

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('taskId', task.id.toString());
    setDraggedTask(task);
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedTask(null);
    setDragOverStatus(null);
  };

  const handleDragOver = (e, status) => {
    e.preventDefault();
    setDragOverStatus(status);
  };

  const handleDrop = (e, status, onUpdateTask) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onUpdateTask(parseInt(taskId), { status });
    }
    setDragOverStatus(null);
  };

  return (
    <DragAndDropContext.Provider value={{
      draggedTask,
      dragOverStatus,
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDrop
    }}>
      {children}
    </DragAndDropContext.Provider>
  );
};