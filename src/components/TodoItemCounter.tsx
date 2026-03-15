
interface TodoItemCounterProps{
    done:number;
    total:number;


}
const TodoItemCounter: React.FC<TodoItemCounterProps> =({done, total}) => { 
return (
<>

    <p>I have completed {done}/{total} items</p>
   </>
    )
}
export default TodoItemCounter;
