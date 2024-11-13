import React from 'react';
import TodoList from './components/TodoList';
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
        <div className="container mx-auto px-4 py-8">
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;