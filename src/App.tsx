import { useState } from 'react';
import './assets/app.scss'
import TodoItemCounter from './components/TodoItemCounter';

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
console.log(inputTodoTitle)
  const showError = inputTodoTitle.length > 0 && inputTodoTitle.length < 3;

	const handleFormSubmit= (e:React.SubmitEvent) => {
  	e.preventDefault()
    const newTodoItem: TodoItem = {
      id:Math.max(0, ... todos.map(todo => todo.id)) + 1 ,title : inputTodoTitle, done: false
    }

	console.log(newTodoItem);

	setTodos([...todos, newTodoItem]);
 
    setInputTodoTitle("");
	}

	  const handleToggleDone = (clickedItem: TodoItem) => {
    const updatedItem = {
      ...clickedItem,
      done: !clickedItem.done
    };

    setTodos((prevPosts) =>
      prevPosts.map((post) =>
        post.id === clickedItem.id ? updatedItem : post
      )
    );
  };

  return (
    <>
	<div>
    <h2>THESE ARE MY TODOS</h2>
	<TodoItemCounter done={doneItems.length} total={todos.length}></TodoItemCounter>
		{todos.length === doneItems.length ?(
			<p>💃🏼🪩🕺🥳PARTY💃🏼🪩🕺🥳</p>
		): 
					<ul>
				{todos.map(item =>
					<li key={item.id}
						onClick={() =>handleToggleDone(item)}
						style={{
           					cursor: "pointer",
            				textDecoration: item.done ? "line-through" : "none"
          				}}>
						{item.title} {item.done === true ? "🥳" : "🗑️"}
					</li>
				)}
			</ul>}
	

			

<h2>Do you want to add more todos?</h2>
<form onSubmit={handleFormSubmit}>
				<div className="input-group mb-3">
					<input
						aria-label="TodoItem title"
						className="form-control"
						minLength={2}
						placeholder="write your next sysiphyan task"
         				 onChange={e =>setInputTodoTitle(e.target.value)}
						type="text"
            			value = {inputTodoTitle}
					/>
	

					<button
						className="btn btn-success"
						type="submit"
						disabled={inputTodoTitle.length < 3}
						value={inputTodoTitle}
					>Create</button>
				</div>
			{showError && (
        <p>Please enter at least 3 letters.</p>
      )}
			</form>
			</div>
    </>
    
  )
}

export default App
