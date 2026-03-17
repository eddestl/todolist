import { useState } from 'react'
import './assets/app.scss'
import Container from "react-bootstrap/Container";
import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Todo } from './types/Todo.types';

  const initialTodos: Todo[] = [
    { id: 1, title: 'Curl hair', completed: true },
    { id: 2, title: 'Paint nails', completed: true },
    { id: 3, title: 'Face mask', completed: false },
  ]
function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [inputTodoTitle, setInputTodoTitle] = useState("");

  const handleAddTodo = (e: React.SubmitEvent) =>{
    e.preventDefault();
    //create a new item and set a new list of todoItems containing the previous todos + the new todo

    setTodos([...todos, {
      id: Math.max(0,...todos.map(todo => todo.id)) +1,
      title: inputTodoTitle,
      completed: false
    }])
    //clear input field
    setInputTodoTitle("");
  }

  const handleToggleTodo = (item:Todo) => {
    item.completed = !item.completed;

    console.log(item.completed)
    setTodos([...todos]);
  }

  const handleDeleteTodo = (item:Todo) => {
    setTodos(todos.filter(t => t.id !== item.id));
  }



  return (
    <Container>
      <h1>Simple todo</h1>
      <Form onSubmit={handleAddTodo}>
        <InputGroup className="mb-3">
        <Form.Control
          aria-label="new todo title"
          onChange={(e => setInputTodoTitle(e.target.value))}
          placeholder="Get things done"
          value={inputTodoTitle}
          required/>
        <Button
        type="submit"
        variant="success">Create</Button>
        </InputGroup>

      </Form>
      {todos.length ? (
        <>
      <ListGroup className="todolist mb-3">
        {todos.map(item =>(
          <ListGroup.Item className = {item.completed ? "completed" :""} key={item.id}>
            <span className="todo-title">{item.title}</span>
            <div>            
              <Button 
              onClick={() => handleToggleTodo(item)}
            size="sm"
            variant="outline-warning">Toggle status</Button>
            <Button 
              onClick={() => handleDeleteTodo(item)}
            size="sm"
            variant="outline-danger">Delete item</Button>
            </div>

          </ListGroup.Item>
        ))}
      </ListGroup>
      <p className="text-muted"> {todos.filter(item => item.completed).length} / {todos.length} completed</p>
      </>

      ) :(<p >You are done for the day!</p>)
      } 

    </Container>
  )
}

export default App