/**
 * Service for communicating with the json-server backend
 */
import axios from "axios";
import { CreateTodoPayload, Todo, UpdateTodoPayload } from "../types/Todo.types";
const BASE_URL = "http://localhost:3000";

/**
 * Get all todos (fetch edition)
 * @returns 
 */
export const getTodosFetch = async () => {
    
//eftersom den markerats som async, så kommer den har ett promise
const res = await fetch(BASE_URL +"/todos") // returnerar ett promise om en response. 
      if(!res.ok){
        throw new Error("somethings up")
      }
      return await res.json();
}

/**
 * Get all todos (axios)
 */
export const getTodos = async ()=> {
    const res = await axios.get<Todo[]>(BASE_URL + "/todos");
    return res.data;
}

export const createTodos = async (payload:CreateTodoPayload)=> {
    const res = await axios.post<Todo>(BASE_URL + "/todos", payload);
    return res.data;
}

export const updateTodos = async (id:number, payload:UpdateTodoPayload)=> {
    const res = await axios.patch<Todo>(BASE_URL + "/todos/"+ id, payload)
    console.log("id " + id)
    return res.data;
}