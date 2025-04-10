import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from "./actionTypes";
export const addTodo = (content,deadline)=>({
    type:ADD_TODO,
    payload:{
        id:Date.now(),
        content: typeof content==='string' ? content.trim() :'',
        deadline: deadline ? new Date(deadline).toISOString():null,
        completed:false,
        completedAt:null
    }
});
export const toggleTodo=id=>({
    type:TOGGLE_TODO,
    payload:{id}
});
export const deleteTodo=id=>({
    type:DELETE_TODO,
    payload:{id}
});