import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import AddTodoForm from "./components/AddTodoForm";
import TodoCounter from "./components/TodoCounter";
import type { Todo } from "./types/Todo.types";
import "./assets/App.scss";
import TodoList from "./components/TodoList";
import { createTodos, getTodos } from "./services/TodosApi";




function App() {
	const [todos, setTodos] = useState<Todo[] |null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const getData = async () => {
      try{
		const data = await getTodos();

      setTodos(data);
      setIsLoading(false);
  } catch(err){
      console.error("getData error: ", err)
      setError(err instanceof Error ? err.message : "It's not me, it's you")
       setIsLoading(false);
  } 
}

	const handleAddTodo = async (title: string) => {
		try{
			const newTodo = await createTodos({
				title:title,
				completed:false
			});
			console.log("created Todo yayy! Reloading todos...");

			setTodos([...todos ?? [], newTodo])
		} catch (err) {
			console.error("Error thrown when creating Todo: ", err)
      		setError( err instanceof Error ? "Could not create TODO" +err.message : "It's not me, it's you")
       		setIsLoading(false);
		}
	}

	const handleDeleteTodo = (todo: Todo) => {
		//FIX ME
	}

	const handleToggleTodo = (todo: Todo) => {
		//FIX ME
	}

  useEffect(() => {

   getData();
  }, []);

	// Derive list of completed/incompleted todos from the `todos` state
	const completedTodos = todos?.filter(todo => todo.completed) ?? [];
	const incompleteTodos = todos?.filter(todo => !todo.completed) ?? [];

	return (
		<Container>
			<h1>Simple Todos</h1>

			<AddTodoForm onAddTodo={handleAddTodo} />

			{error && <Alert variant="danger">{error}</Alert>}

      {isLoading && <p>Loading todo items</p>}
      

			{todos && ( todos.length ? (
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