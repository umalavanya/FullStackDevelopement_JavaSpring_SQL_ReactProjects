import  { useState, useEffect } from 'react';
import TodoItem from './TodoItem'; // చైల్డ్ కాంపోనెంట్ ని ఇంపోర్ట్ చేసాం

function App() {
  // --- 1. STATES ---
  // ఇన్పుట్ బాక్స్ లో టైప్ చేసే టెక్స్ట్ కోసం స్టేట్ (Forms Handling)
  const [inputText, setInputText] = useState("");
  
  // టాస్క్‌ల లిస్ట్ మొత్తాన్ని దాచడానికి అరే స్టేట్ (Lists & State)
  // స్టార్టింగ్ లో బ్రౌజర్ LocalStorage లో ఆల్రెడీ ఏమైనా టాస్క్‌లు ఉంటే తెచ్చుకుంటుంది, లేదంటే ఖాళీ అరే [] తీసుకుంటుంది
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("myTodos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // --- 2. EFFECTS (useEffect) ---
  // ప్రతిసారి todos అరే మారినప్పుడల్లా (యాడ్ లేదా డిలీట్ అయినప్పుడు), ఈ ఎఫెక్ట్ రన్ అయ్యి లేటెస్ట్ డేటాని బ్రౌజర్ లో దాస్తుంది
  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todos));
    console.log("టాస్క్‌ల లిస్ట్ అప్‌డేట్ అయ్యింది, బ్రౌజర్ లో సేవ్ చేసాను! 💾");
  }, [todos]); // Dependency Array లో todos పెట్టాం (Infinite Loop రాకుండా)

  // --- 3. FUNCTIONS (Logic) ---
  // కొత్త టాస్క్ ని అరే లోకి యాడ్ చేసే ఫంక్షన్
  function handleAddTask(event) {
    event.preventDefault(); // ఫామ్ సబ్మిట్ అయినప్పుడు పేజీ రీలోడ్ అవ్వకుండా ఆపుతుంది
    
    if (inputText.trim() === "") return; // ఖాళీగా ఉంటే యాడ్ చేయొద్దు

    // ఒక కొత్త టాస్క్ ఆబ్జెక్ట్ క్రియేట్ చేస్తున్నాం
    const newTodo = {
      id: Date.now(), // కీ (key) ప్రాప్ కోసం ఒక యూనిక్ నంబర్
      text: inputText
    };

    // పాత టాస్క్‌లతో పాటు కొత్త టాస్క్ ని యాడ్ చేస్తున్నాం (Spread Operator)
    setTodos([...todos, newTodo]);
    setInputText(""); // టాస్క్ యాడ్ అయిపోయాక ఇన్పుట్ బాక్స్ ని ఖాళీ చేస్తున్నాం
  }

  // టాస్క్ ని డిలీట్ చేసే ఫంక్షన్
  function handleDeleteTask(idToDelete) {
    // .filter() వాడి మనం క్లిక్ చేసిన ఐడీ కాకుండా మిగతా వాటన్నిటినీ ఉంచి కొత్త అరే క్రియేట్ చేస్తున్నాం
    const updatedTodos = todos.filter(todo => todo.id !== idToDelete);
    setTodos(updatedTodos);
  }

  // --- 4. JSX (UI) ---
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>నా యాక్టివిటీ లిస్ట్ 📝</h1>
      
      {/* FORMS HANDLING: ఇన్పుట్ బాక్స్ ని స్టేట్ కి కనెక్ట్ చేసాం */}
      <form onSubmit={handleAddTask}>
        <input 
          type="text" 
          placeholder="కొత్త టాస్క్ రాయండి..." 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ padding: '8px', width: '70%' }}
        />
        <button type="submit" style={{ padding: '8px', marginLeft: '5px' }}>Add</button>
      </form>

      {/* CONDITIONAL RENDERING & LISTS: టాస్క్‌లు ఉంటేనే లిస్ట్ చూపిస్తాం, లేదంటే ఒక మెసేజ్ చూపిస్తాం */}
      {todos.length === 0 ? (
        <p style={{ marginTop: '20px', color: 'gray' }}>ఈరోజుకి పనులేమీ లేవు! ప్రశాంతంగా ఉండండి. 😎</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
          {/* LISTS & KEYS: .map() వాడి ప్రతి టాస్క్ ని చైల్డ్ కాంపోనెంట్ లోకి మారుస్తున్నాం */}
          {todos.map(todo => (
            <TodoItem 
              key={todo.id} // యూనిక్ కీ ప్రాప్ ఇచ్చాం
              task={todo}   // ప్రాప్ గా టాస్క్ ఆబ్జెక్ట్ ని పంపాం
              onDelete={handleDeleteTask} // ప్రాప్ గా డిలీట్ ఫంక్షన్ ని పంపాం
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
