import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { IoIosAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  // Making localstorage
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar></Navbar>

      <div className="container min-h-[90vh] p-5 m-8 mx-auto my-8 bg-blue-200 rounded-2xl">
        <div className="addTodo">
          <h2 className="my-2 text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-1/2"
          />
          <button
            disabled={todo.length <= 3}
            onClick={handleAdd}
            className="p-3 py-1 mx-6 font-medium text-white rounded-md bg-violet-800 hover:bg-violet-950 disabled:bg-violet-600"
          >
            <IoIosAdd />
          </button>
        </div>
        <div>
          <h2 className="my-3 text-lg font-bold text-black">Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && (
              <div className="m-5">No Todos to display</div>
            )}
            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex justify-between w-1/2 py-1 todo"
                >
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    value={item.isCompleted}
                  />
                  <div
                    className={
                      item.isCompleted ? "line-through " : "font-medium"
                    }
                  >
                    {item.todo}
                  </div>
                  <div className="buttons">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="p-3 py-1 mx-1 font-medium text-white rounded-md bg-violet-800 hover:bg-violet-950 "
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="p-3 py-1 mx-1 font-medium text-white rounded-md bg-violet-800 hover:bg-violet-950 "
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

// 39 minutes
