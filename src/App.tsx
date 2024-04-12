import { useState } from "react";
import "./App.css";

function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [todo, setTodo] = useState([]);
  const [filter, setFilter] = useState<string>("all");

  function getTodos(event: string) {
    setInputValue(event);
  }

  console.log(todo);

  function mode() {
    setIsDark(!isDark);
  }

  function createTodo() {
    if (inputValue.trim() !== "") {
      const created: any = [
        ...todo,
        { title: inputValue, id: todo.length + 1, checked: false },
      ];
      setTodo(created);

      setInputValue("");
    }
  }

  console.log(filter);

  function checking(id: number) {
    const newArray = [...todo];
    const index = todo.findIndex((item) => item.id === id);
    newArray[index].checked = !newArray[index].checked;
    setTodo(newArray);
  }

  const filteredTodos = todo.filter((todo) => {
    if (filter === "completed") {
      return todo.checked;
    } else if (filter === "active") {
      return !todo.checked;
    }
    return todo;
  });
  function deleteCompleted() {
    const deleted = todo.filter((item) => item.checked === false);
    setTodo(deleted);

    console.log(deleted);
  }

  // function filtering() {
  //   if (filter === "completed") {
  //     const filtered = todo.filter((item) => item.checked === true);
  //     setTodo(filtered);
  //   } else if (filter === "active") {

  //     const filtered = todo.filter((item) => item.checked === false);
  //     setTodo(filtered);
  //   }
  //   return true;
  // }

  function deleteTodo(index: number) {
    const newTodos = todo.filter((_, i) => i !== index);
    setTodo(newTodos);
  }

  return (
    <div
      style={{ background: isDark ? "#171823" : "#fafafa" }}
      className=" flex flex-col  w-full  h-screen font-[Josefin San]"
      id="container"
    >
      <div id="heading" className="w-full">
        {isDark ? (
          <div className="bg-desktop-dark h-52 bg-no-repeat bg-cover bg-center md:h-80">
            <header className="flex flex-row justify-between md:items-center w-[327px] md:w-[541px] mx-auto pt-10 md:pt-20 px-0">
              <h1 className="text-white text-2xl font-bold tracking-[10px] uppercase cursor-pointer md:text-4xl md:tracking-[15px]">
                todo
              </h1>
              <img
                src="/assets/icon-sun.svg"
                alt=""
                className="w-5 h-5 md:w-7 md:h-7 cursor-pointer"
                onClick={() => {
                  mode();
                }}
              />
            </header>
          </div>
        ) : (
          <div className="bg-desktop-light h-52 bg-no-repeat bg-cover bg-center md:h-80">
            <header className="flex flex-row justify-between md:items-center w-[327px] md:w-[541px] mx-auto pt-10 md:pt-20 px-0">
              <h1 className="text-white text-2xl font-bold tracking-[10px] uppercase cursor-pointer md:text-4xl md:tracking-[15px]">
                todo
              </h1>
              <img
                src="/assets/icon-moon.svg"
                alt=""
                className="w-5 h-5 md:w-7 md:h-7 cursor-pointer"
                onClick={() => {
                  mode();
                }}
              />
            </header>
          </div>
        )}
      </div>
      <div className="w-full max-w-[327px] md:max-w-[541px] mx-auto -mt-28">
        <form action="" className="relative">
          <div className="flex flex-row">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  createTodo();
                }
              }}
              value={inputValue}
              onChange={(e) => {
                let latest = e.target.value;
                getTodos(latest);
              }}
              className={` ${isDark ? "text-white" : "text-[#393a4b]"} ${
                isDark ? "bg-[#25273d]" : "#ffffff"
              }  w-full py-[14px] text-sm  md:text-lg rounded-[5px] shadow-lg pl-[72px] mb-4`}
              type="text"
              placeholder="Create a new todo..."
            />
            <img
              src="https://todo-app-react-lazzzare.vercel.app/assets/Circle-c1585e2b.svg"
              alt="check-icon"
              className="w-5 h-5 border-[1 px solid #393a4b] absolute left-6 top-[37%] transform -translate-y-1/2"
            />
          </div>
        </form>
        <div style={{ overflowY: "auto", maxHeight: "600px" }} id="todo-list">
          {filteredTodos.map((item, index) => {
            return (
              <ul>
                <div
                  key={item.id}
                  className={`flex flex-row justify-between items-center  border-b-[1px] shadow-lg py-4 px-5 text-xs md:text-lg tracking-[-0.167px] ${
                    isDark ? "bg-[#25273d]" : "bg-[#fafafa]"
                  } ${
                    isDark ? "border-[#393A4B]" : "border-[#E3E4F1]"
                  }  text-[#C8CBE7]`}
                  style={{ opacity: 1, transform: "none" }}
                >
                  <div className="relative flex items-center gap-3 md:gap-5 flex-row ">
                    {item.checked ? (
                      <img
                        src="https://todo-app-react-lazzzare.vercel.app/assets/CompleteCircle-8631cc89.svg"
                        alt="CircleIcon"
                        className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"
                        onClick={() => checking(item.id)}
                      />
                    ) : (
                      <img
                        src="https://todo-app-react-lazzzare.vercel.app/assets/Circle-c1585e2b.svg"
                        alt="CircleIcon"
                        className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"
                        onClick={() => checking(item.id)}
                      />
                    )}
                    <li>
                      <p
                        className={`whitespace-normal  ${
                          isDark ? "text-[#c8cbe7]" : "text-[#393a4b]"
                        } ${item.checked ? "line-through" : "no-underline"}  ${
                          isDark &&
                          item.checked  ?  "text-[#545778]" : "text-[#c8cbe7]"
                        } ${isDark ? "hover:text-[#e3e4f1]" : "hover:text-[#494c6b]"}  break-words max-w-[200px] md:max-w-[400px]`}
                      >
                        {item.title}
                      </p>
                    </li>
                  </div>
                  <img
                    onClick={() => deleteTodo(index)}
                    id="delete-todo"
                    src="/assets/icon-cross.svg"
                    className="cursor-pointer"
                    alt=""
                  />
                </div>
              </ul>
            );
          })}

          {todo.length > 0 && (
            <div className="flex flex-col gap-4">
              <div
                className={`flex flex-row items-center ${
                  isDark ? "text-[#5b5e7e]" : "text-[#9495a5]"
                } justify-between px-5 py-4 pb-[22px] ${
                  isDark ? "bg-[#25273d]" : "bg-[#fafafa]"
                } ${
                  isDark ? "border-[#393A4B]" : "border-[#E3E4F1]"
                } text-xs md:text-sm rounded-b[5px] shadow-md`}
              >
                <h3>{todo.length} Items Left</h3>
                <div
                  className={`hidden ${
                    isDark ? "bg-[#25273D]" : "bg-[#fafafa]"
                  } ${
                    isDark ? "border-[#393A4B]" : "border-[#E3E4F1]"
                  }   md:flex flex-row justify-center items-center gap-5 text-[#5B5E7E] text-sm`}
                >
                  <span
                    onClick={() => setFilter("all")}
                    className={` font-boldhover:text-white cursor-pointer ${
                      filter === "all" ? "text-[#3A7CFD]" : "text-[#5B5E7E]"
                    }`}
                  >
                    All
                  </span>
                  <span
                    onClick={() => {
                      setFilter("active");
                    }}
                    className={` font-boldhover:text-white cursor-pointer ${
                      filter === "active" ? "text-[#3A7CFD]" : "text-[#5B5E7E]"
                    }`}
                  >
                    Active
                  </span>
                  <span
                    onClick={() => {
                      setFilter("completed");
                    }}
                    className={` font-boldhover:text-white cursor-pointer ${
                      filter === "completed"
                        ? "text-[#3A7CFD]"
                        : "text-[#5B5E7E]"
                    }`}
                  >
                    Completed
                  </span>
                </div>
                <h3
                  onClick={() => deleteCompleted()}
                  className="cursor-pointer"
                >
                  Clear Completed
                </h3>
              </div>
              <div
                className={`md:hidden ${
                  isDark ? "bg-[#25273D]" : "bg-[#fff]"
                } ${
                  isDark ? "border-[#393A4B]" : "border-[#E3E4F1]"
                }   pt-[15px] pb-[19px] flex flex-row justify-center items-center gap-5 text-[#5B5E7E] text-sm`}
              >
                <span
                  onClick={() => setFilter("all")}
                  
                  className={` font-boldhover:text-white cursor-pointer ${
                    filter === "all" ? "text-[#3A7CFD]" : "text-[#5B5E7E]"
                  }`}
                >
                  All
                </span>
                <span
                  onClick={() => {
                    setFilter("active");
                  }}
                  className={` font-boldhover:text-white cursor-pointer ${
                    filter === "active" ? "text-[#3A7CFD]" : "text-[#5B5E7E]"
                  }`}
                >
                  Active
                </span>
                <span
                  onClick={() => {
                    setFilter("completed");
                  }}
                  className={` font-boldhover:text-white cursor-pointer ${
                    filter === "completed" ? "text-[#3A7CFD]" : "text-[#5B5E7E]"
                  }`}
                >
                  Completed
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
