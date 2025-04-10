import React from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../store/actions";
import { format, isBefore, isToday, isTomorrow, addDays, parseISO } from 'date-fns';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const getDeadlineColor = () => {
    if (todo.completed) return 'gray'; 
    if (!todo.deadline) return 'black'; 
    
    try {
      const now = new Date();
      const deadline = parseISO(todo.deadline);
      
      if (isBefore(deadline, now)) return 'red';
      if (isToday(deadline) || isTomorrow(deadline)) return 'orange'; 
      if (isBefore(addDays(now, 3), deadline)) return 'green'; 
      return 'blue';
    } catch (e) {
      console.error('Ошибка обработки даты:', e);
      return 'black';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      return format(parseISO(dateString), 'dd.MM.yyyy HH:mm');
    } catch (e) {
      console.error('Ошибка форматирования даты:', e);
      return 'Некорректная дата';
    }
  };

  return (
    <div className="todo-item" style={{ margin: '8px 0' }}>
      <input
        type="checkbox"
        checked={todo.completed || false}
        onChange={() => dispatch(toggleTodo(todo.id))}
        style={{ marginRight: '10px' }}
      />

      <span style={{ 
        textDecoration: todo.completed ? 'line-through' : 'none',
        color: todo.completed ? '#888' : '#333'
      }}>
        {todo.content || 'Без названия'}
      </span>

      <div style={{ marginLeft: '20px', fontSize: '0.9em' }}>

        {todo.deadline && (
          <div style={{ color: getDeadlineColor() }}>
            Дедлайн: {formatDate(todo.deadline)}
          </div>
        )}

        {todo.completed && todo.completedAt && (
          <div style={{ color: 'gray' }}>
            Выполнено: {formatDate(todo.completedAt)}
          </div>
        )}
      </div>

      <button 
        className="delete-btn"
        onClick={() => dispatch(deleteTodo(todo.id))}
        aria-label="Удалить задачу"
      >
        ×
      </button>
    </div>
  );
};

export default TodoItem;