import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useSelector(state => state.todos);

  const groupedTodos = todos.reduce((acc, todo) => {
    const dateKey = todo.deadline ? todo.deadline.split('T')[0] : 'no-date';
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(todo);
    return acc;
  }, {});

  return (
    <div className="todo-list">
      {Object.entries(groupedTodos).map(([date, todos]) => (
        <div key={date} className="date-group">
          <h3>
            {date === 'no-date' 
              ? 'Без срока' 
              : new Date(date).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })
            }
          </h3>
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TodoList;