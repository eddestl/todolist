interface TodoItemCounterProps{
    done:number;
    total:number;
}

const TodoItemCounter: React.FC<TodoItemCounterProps> =({done, total}) => { 
return (
<>
    <p className="todo-counter text-center d-block mx-auto">🌸✨ I have completed {done}/{total} tasks ✨🌸</p>
</>
)
}

export default TodoItemCounter;