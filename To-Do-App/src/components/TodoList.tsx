import React, { useState } from "react";
import {
  PlusCircle,
  Calendar,
  Clock,
  Tags,
  CheckCircle2,
  Circle,
  Trash2,
  Edit3,
  Save,
  Star,
  AlertCircle,
} from "lucide-react";
import { useTodo } from "../context/TodoContext";

function TodoList() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodo();
  const [newTodo, setNewTodo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("normal");
  const [category, setCategory] = useState("personal");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    addTodo({
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      dueDate,
      priority,
      category,
      createdAt: new Date().toISOString(),
    });

    setNewTodo("");
    setDueDate("");
    setPriority("normal");
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id: string) => {
    if (editText.trim()) {
      updateTodo(id, editText);
    }
    setEditingId(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "normal":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Gobal Hack Week To do List
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <PlusCircle size={20} />
              Add Task
            </button>
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-gray-500" />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-3 py-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <AlertCircle size={20} className="text-gray-500" />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-3 py-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="normal">Normal Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Tags size={20} className="text-gray-500" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`bg-white rounded-lg shadow-md p-4 transition-all ${
              todo.completed ? "opacity-75" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  {todo.completed ? (
                    <CheckCircle2 className="text-green-500" size={24} />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>

                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 px-3 py-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    autoFocus
                  />
                ) : (
                  <span
                    className={`flex-1 ${
                      todo.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Star
                  className={`${getPriorityColor(todo.priority)}`}
                  size={20}
                />

                {todo.dueDate && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock size={16} />
                    {new Date(todo.dueDate).toLocaleDateString()}
                  </div>
                )}

                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                  {todo.category}
                </span>

                {editingId === todo.id ? (
                  <button
                    onClick={() => saveEdit(todo.id)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Save size={20} />
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(todo.id, todo.text)}
                    className="text-gray-500 hover:text-indigo-600"
                  >
                    <Edit3 size={20} />
                  </button>
                )}

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
