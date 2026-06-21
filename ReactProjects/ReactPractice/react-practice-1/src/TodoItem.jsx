// Props ని డిస్ట్రక్చర్ చేసి తీసుకుంటున్నాం
function TodoItem({ task, onDelete }) {
  return (
    <li className="todo-item" style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
      {/* 1. టాస్క్ పేరు చూపిస్తున్నాం */}
      <span>{task.text}</span>
      
      {/* 2. బటన్ క్లిక్ చేసినప్పుడు పేరెంట్ నుండి వచ్చిన onDelete ఫంక్షన్ కి ఈ టాస్క్ ఐడీ ని పంపుతున్నాం */}
      <button onClick={() => onDelete(task.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
