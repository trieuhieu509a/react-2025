import React, { useEffect, useRef } from 'react'
import { Todo } from '../models/model'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    index: number,
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    key: number,
}

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
    const [edit, setEdit] = React.useState<boolean>(false);
    const [editTodo, setEditTodo] = React.useState<string>(todo.todo);

    const handleDone = (id: number) => () => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        isDone: !todo.isDone
                    }
                }
                return todo;
            })
        )
    }

    const handleDelete = (id: number) => () => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleSubmit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id) ? { ...todo, todo: editTodo } : todo)
        )
        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided, snapshot) => (
                    <form
                        className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
                        onSubmit={(e) => handleSubmit(e, todo.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {
                            edit ? (
                                <input
                                    ref={inputRef}
                                    type="text" value={editTodo}
                                    onChange={(e) => setEditTodo(e.target.value)}
                                    className='todos__single--text'
                                />
                            ) :
                                (
                                    todo.isDone ?
                                        <s className='todos__single--text'>{todo.todo}</s> :
                                        <span className='todos__single--text'>{todo.todo}</span>
                                )
                        }
                        <div>
                            <span
                                className="icon"
                                onClick={() => {
                                    if (!edit && !todo.isDone) {
                                        setEdit(!edit);
                                    } else {

                                    }
                                }
                                }
                            >
                                <AiFillEdit />
                            </span>
                            <span className="icon" onClick={handleDelete(todo.id)}>
                                <AiFillDelete />
                            </span>
                            <span className="icon" onClick={handleDone(todo.id)}>
                                <MdDone />
                            </span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
}

export default SingleTodo
