import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import AddTodoForm from "./components/AddTodoForm";
import TodoCounter from "./components/TodoCounter";
import type { Todo } from "./types/Todo.types";
import "./assets/App.scss";
import TodoList from "./components/TodoList";


function App() {
	const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | false>(false);
  const [isLoading, setIsLoading] = useState(true);

	const handleAddTodo = (title: string) => {
		// Create a new todo and set a new list of todos containing the
		// previous todos + the new todo
		setTodos([...todos, {
			id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
			title,
			completed: false,
		}]);
	}

	const handleDeleteTodo = (todo: Todo) => {
		setTodos(todos.filter(t => t.id !== todo.id));
	}

	const handleToggleTodo = (todo: Todo) => {
		todo.completed = !todo.completed;
		setTodos([...todos]);
	}

  useEffect(() => {

    const getData = async () => {
      try{
    //make request to API. Get-anrop till localhost:3000/todos
      const res = await fetch("http://localhost:3000/todos") // returnerar ett promise om en response. 
      if(!res.ok){
        throw new Error("somethings up")
      }
      const data = await res.json();
      setTodos(data);
      setIsLoading(false);
  } catch(err){
      console.error("getData error: ", err)
      setError(err instanceof Error ? err.message : "It's not me, it's you")
       setIsLoading(false);
  } 
}
   getData();
  }, [])

	// Derive list of completed/incompleted todos from the `todos` state
	const completedTodos = todos.filter(todo => todo.completed);
	const incompleteTodos = todos.filter(todo => !todo.completed);

	return (
		<Container>
			<h1>Simple Todos</h1>

			<AddTodoForm onAddTodo={handleAddTodo} />

      {isLoading && <p>Loading todo items</p>}
      

			{!isLoading && !error && ( todos.length ? (
				<>
					<h2 className="h5 mb-2">💪🏻 Stuff I got to do</h2>
          <TodoList 
              onDelete ={handleDeleteTodo}
              onToggle = {handleToggleTodo}
              todos = {incompleteTodos}/>

					<h2 className="h5 mb-2">🥺 Stuff I've done</h2>
          <TodoList 
              onDelete ={handleDeleteTodo}
              onToggle = {handleToggleTodo}
              todos = {completedTodos}/>

					<TodoCounter
						completed={completedTodos.length}
						total={todos.length}
					/>
				</>
			) : (
				<p>You ain't got no todos to do, time to party!!111 Untz untz untz 🥳!</p>
			)
      )}
		</Container>
	);
}

export default App;