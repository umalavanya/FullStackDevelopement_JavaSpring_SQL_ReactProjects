import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { DragAndDropProvider } from './components/DragAndDropContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <DragAndDropProvider>
        <App />
      </DragAndDropProvider>
    </AuthProvider>
  </React.StrictMode>,
)