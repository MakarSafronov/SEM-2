import { format, isValid } from 'date-fns';
import TodoItem from './TodoItem';
const DateGroup = ({ date, todos }) => {
  let displayDate;
  
  if (date === 'no-date') {
    displayDate = 'Без срока';
  } else {
    const dateObj = new Date(date);
    displayDate = isValid(dateObj) 
      ? format(dateObj, 'dd.MM.yyyy HH:mm')
      : 'Неверная дата';
  }

  return (
    <div className="date-group">
      <h3>{displayDate}</h3>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
export default DateGroup;
