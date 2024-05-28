import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { useTodos } from '@/hooks'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [
    { todos, newTodo },
    {
      fetchTodos = () => {},
      updateTodo = () => {},
      deleteTodo = () => {},
      handleInputChange = () => {},
      addTodo = () => {},
    },
  ] = useTodos()

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleAddTodo = () => {
    if (newTodo) {
      addTodo(newTodo)
    }
  }

  const handleUpdateTodo = e => {
    updateTodo(e.target.value)
  }

  const handleDeleteTodo = e => {
    deleteTodo(e.target.value)
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex-col">
        <h1 className="text-2xl mb-6">Next.js & Supabase todos</h1>
        <input
          type="text"
          name=""
          id=""
          value={newTodo}
          className="py-2 px-1 rounded-md text-slate-600"
          onChange={handleInputChange}
        />
        <button
          className="ml-3 bg-slate-400 p-2 rounded-md hover:bg-slate-600"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
        <div>
          {todos &&
            todos.map(todo => {
              return (
                <div key={todo.id} className="py-3 flex items-center">
                  <input
                    type="checkbox"
                    checked={todo?.is_completed}
                    value={todo.id}
                    onChange={handleUpdateTodo}
                  />
                  <span
                    className={`pl-2 text-decoration-line: ${
                      todo?.is_completed ? 'line-through' : 'none'
                    }`}
                  >
                    {todo.todo_text}
                  </span>
                  <button
                    className="ml-2 mt-1"
                    value={todo?.id}
                    onClick={handleDeleteTodo}
                  >
                    {' '}
                    ❌
                  </button>
                </div>
              )
            })}
        </div>
      </div>
    </main>
  )
}
