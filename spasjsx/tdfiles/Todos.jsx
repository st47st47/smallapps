import { useEffect, useState } from "react"
import styles from '../../spscss/todos.module.css'

export default function Todos() {
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("ITEMS")
        if (localValue === null) return []

        return JSON.parse(localValue)
    })


    useEffect(() => {
        localStorage.setItem("ITEMS", JSON.stringify(todos))
    }, [todos])


    function addTodo(title,) {
        setTodos(currentTodos => {
            return [...currentTodos, { id: crypto.randomUUID(), title, completed: false }]
        })

    }


    function toggletodo(id, completed) {
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed }
                }
                return todo
            })
        })
    }


    function deletetodo(id) {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id)
        })
    }


    return (
        <div className={styles.hero}>
            <div className={styles.Yappp}>
                <NewtodoForm Onsubmitt={addTodo} />
                <h1 className={styles.header}>To do list</h1>
                <Todolist todos={todos} toggletodo={toggletodo} deletetodo={deletetodo} />
            </div>
        </div>

    )
}

















// 
function NewtodoForm({ Onsubmitt }) {

    const [newItem, setNewItem] = useState("")

    function handlesubmit(e) {
        e.preventDefault()
        if (newItem === "") return

        Onsubmitt(newItem)

        setNewItem("")
    }

    return <form className={styles.newitemform} onSubmit={handlesubmit}>
        <div className={styles.formrow}>
            <input value={newItem} type="text" id="itemm" onChange={e => setNewItem(e.target.value)} placeholder='A new item....' />
        </div>
        <button className={styles.btn}>Add</button>
    </form>
}

















// 
function Todolist({ todos, toggletodo, deletetodo }) {
    return (<div className={styles.listt}>
        {todos.length === 0 && "---No todos---"}
        {todos.map(todo => {
            return <Todoitem key={todo.id} {...todo} toggletodo={toggletodo} deletetodo={deletetodo} />
        })}
    </div>
    )
}

















// 
function Todoitem({ completed, id, title, toggletodo, deletetodo }) {
    return (<li>
        <label>
            <input type="checkbox" checked={completed} onChange={e => toggletodo(id, e.target.checked)} name="checker" />
            {title}
        </label>
        <button className={styles.btn}
            onClick={() => deletetodo(id)}
        >Delete</button>
    </li>)
}