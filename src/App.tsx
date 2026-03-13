import { useState } from 'react';
import './assets/app.scss'

function App() {

  interface TodoItem{
  id:number, 
  title: string;
  done:boolean
}
  	const [todos, setTodos] = useState<TodoItem[]>([
		{ id: 1, title: "Wash dishes", done: true },
		{ id: 2, title: "Mop floor", done: true },
		{ id: 3, title: "Take the trash out", done: false },
	]);

	const doneItems = todos.filter(item => item.done === true)
	const [inputTodoTitle, setInputTodoTitle] = useState("");

	const handleFormSubmit= (e:React.SubmitEvent) => {
  	e.preventDefault()
    const newTodoItem: TodoItem = {
      id:Math.max(0, ... todos.map(todo => todo.id)) + 1 ,title : inputTodoTitle, done: false
    }


	setTodos([...todos, newTodoItem]);
 
    setInputTodoTitle("");
	}

  return (
    <>
	<div>
    <h2>THESE ARE MY TODOS</h2>
	<h3>I have completed {doneItems.length} / {todos.length}</h3>
			{todos.length > 0 ? (
				<ul>
					{todos.map(item =>
						<li key={item.id}>
							  {item.title} {item.done === true ? "❤️" : "🗑️"}
						</li>
					)}
				</ul>
			) : (
				<p>These are not the posts you're looking for.</p>
			)}

<h2>Do you want to add more todos?</h2>
<form onSubmit={handleFormSubmit}>
				<div className="input-group mb-3">
					<input
						aria-label="Post title"
						className="form-control"
						placeholder="write your next sysiphyan task"
          onChange={e =>setInputTodoTitle(e.target.value)}
						type="text"
            value = {inputTodoTitle}
						required
					/>

					<button
						className="btn btn-success"
						type="submit"
					>Create</button>
				</div>
			</form>
			</div>
    </>
    
  )
}

export default App
