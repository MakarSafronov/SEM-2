import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './store/actions';
import TodoList from './components/TodoList';

const App = () => {
  const [taskText, setTaskText] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = taskText.trim();
    if (!text) return;

    dispatch(addTodo(text, taskDeadline || null));
    
    setTaskText('');
    setTaskDeadline('');
  };

  return (
    <div className="app">
      <h1>Список задач</h1>
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Введите задачу"
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="datetime-local"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
          />
        </div>
        
        <button type="submit" className="submit-btn">
          Добавить задачу
        </button>
      </form>

      <TodoList />
    </div>
  );
};

export default App;