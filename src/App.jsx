import Navbar from './components/Navbar';
import { useState,useEffect } from 'react';
import{v4 as uuidv4} from 'uuid';
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true)
  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const saveToLS=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const toggleFinished=()=>{
    setshowfinished(!showfinished)
  }

  const handleEdit = (id) => {
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id:uuidv4(),todo, isCompleted: false }]);
    setTodo('');
    saveToLS();
  };
  const handlecheck=(e) => {
    let id=e.target.name
    let index=todos.findIndex(item=>{
      return item.id==id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS();
  }
  

  const handleDelete = (id) => {
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-1/2">
        <h1 className='font-bold text-center text-xl'>iTask-Manage your Todos at one place</h1>
        <br /><br />
        <div className="addtodo">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-80" />
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-slate-700 hover:bg-slate-950 disabled:bg-slate-700 p-2 py-1 text-sm font-bold text-white rounded-md m-6 cursor-pointer">
            Add
          </button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showfinished}/>{''} Show Finished
        <br /><br />
        <h2 className="text-xl font-bold">Your todos</h2>
        <div className="todos">
          {todos.length==0 && <div>No Todos</div>}
          {todos.map(item => {

            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/4 my-3 justify-between md:w-1/2">
              <div className='flex gap-5'>

              <input name={item.id} onClick={handlecheck} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? 'line-through' : ''}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={()=>{handleEdit(item.id)}} className="bg-slate-700 hover:bg-slate-950 p-3 py-1 text-sm font-bold text-white rounded-md m-2 relative bottom-2">
                  <FaEdit/>
                </button>
                <button onClick={(e)=>{handleDelete(item.id)}} className="bg-slate-700 hover:bg-slate-950 p-3 py-1 text-sm font-bold text-white rounded-md m-2 relative bottom-2">
                  <AiFillDelete/>
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
