import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/app.scss'
import TodoItemCounter from './components/TodoItemCounter'

interface TodoItem {
  id: number
  title: string
  done: boolean
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, title: 'Curl hair', done: true },
    { id: 2, title: 'Paint nails', done: true },
    { id: 3, title: 'Face mask', done: false },
  ])

  const doneItems = todos.filter((item) => item.done === true)
  const [inputTodoTitle, setInputTodoTitle] = useState('')
  const showError = inputTodoTitle.length > 0 && inputTodoTitle.length < 3

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (inputTodoTitle.trim().length < 3) {
      return
    }

    const newTodoItem: TodoItem = {
      id: Math.max(0, ...todos.map((todo) => todo.id)) + 1,
      title: inputTodoTitle,
      done: false,
    }

    setTodos([...todos, newTodoItem])
    setInputTodoTitle('')
  }

  const handleToggleDone = (clickedItem: TodoItem) => {
    const updatedItem = {
      ...clickedItem,
      done: !clickedItem.done,
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === clickedItem.id ? updatedItem : todo
      )
    )
  }

  return (
    <div className="todo-app-bg">
      <div className="container py-5">
        <div className="todo-card mx-auto shadow-lg">
          <div className="todo-card-body">
            <div className="text-center mb-4">
              <h1 className="todo-title">My Pink Todo List</h1>
              <p className="todo-subtitle">Tiny tasks, sparkly vibes</p>
            </div>

            <div className="counter-wrap mb-4">
              <TodoItemCounter done={doneItems.length} total={todos.length} />
            </div>

            {todos.length === doneItems.length ? (
              <div className="party-box text-center mb-4">
                <p className="mb-0">🌸✨ Everything is done! ✨🌸</p>
              </div>
            ) : (
              <ul className="todo-list list-unstyled mb-4">
                {todos.map((item) => (
                  <li
                    key={item.id}
                    className={`todo-item ${item.done ? 'is-done' : ''}`}
                    onClick={() => handleToggleDone(item)}
                  >
                    <span className="todo-text">{item.title}</span>
                    <span className="todo-icon">
                      {item.done ? '🌟' : '🎀'}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="add-todo-section">
              <h2 className="add-title">Do you want to add more todos?</h2>

              <form onSubmit={handleFormSubmit}>
                <div className="input-group todo-input-group">
                  <input
                    aria-label="TodoItem title"
                    className="form-control todo-input"
                    minLength={2}
                    placeholder="write your next sisyphean task"
                    onChange={(e) => setInputTodoTitle(e.target.value)}
                    type="text"
                    value={inputTodoTitle}
                  />

                  <button
                    className="btn btn-success todo-btn"
                    type="submit"
                    disabled={inputTodoTitle.trim().length < 3}
                  >
                    Create
                  </button>
                </div>

                {showError && (
                  <p className="todo-error mt-2 mb-0">
                    Please enter at least 3 letters.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App