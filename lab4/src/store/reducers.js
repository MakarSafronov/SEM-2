import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from "./actionTypes";

const initialState = {
  todos: [],
  filter: 'ALL'
};

export default function todoReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_TODO:
        return {
            ...state,
            todos: [
              ...state.todos,
              {
                ...action.payload,
                deadline: action.payload.deadline 
                  ? new Date(action.payload.deadline).toISOString()
                  : null
              }
            ]
          };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? {
                ...todo,
                completed: !todo.completed,
                completedAt: !todo.completed ? new Date().toISOString() : null
              }
            : todo
        )
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };

    default:
      return state;
  }
}