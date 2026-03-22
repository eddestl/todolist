interface TodoItemCounterProps{
    completed:number;
    total:number;
}

const TodoItemCounter: React.FC<TodoItemCounterProps> =({completed, total}) => { 
return (
<>
    <p className="todo-counter text-center d-block mx-auto">🌸✨ I have completed {completed}/{total} tasks ✨🌸</p>
</>
)
}

export default TodoItemCounter;