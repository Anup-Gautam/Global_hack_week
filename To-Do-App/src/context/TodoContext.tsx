import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  dueDate: string;
  priority: string;
  category: string;
  createdAt: string;
}

interface TodoState {
  todos: Todo[];
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'UPDATE_TODO'; payload: { id: string; text: string } }
  | { type: 'SET_TODOS'; payload: Todo[] };

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, action.payload],
      };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'UPDATE_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };
    case 'SET_TODOS':
      return {
        todos: action.payload,
      };
    default:
      return state;
  }
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      dispatch({ type: 'SET_TODOS', payload: JSON.parse(savedTodos) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const addTodo = (todo: Todo) => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const updateTodo = (id: string, text: string) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, text } });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};