import { useEffect, useState } from "react"
import { retrieveAllTodosForUser, deleteTodoAPI } from "../api/TodoApiService"
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodosComponent() {

    //let todos = [{id: 1,description:"Learn React"}, {id: 2,description:"Learn Spring Security"}];

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);
    const AuthContext = useAuth();
    const username = AuthContext.username;

    useEffect(() => refreshTodos, [])

    const navigate = useNavigate()

    function refreshTodos() {
      retrieveAllTodosForUser(username)
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error))
    }

    function deleteTodo(id) {
      deleteTodoAPI(username, id)
      .then(() => {
        setMessage(`Todo with id ${id} is deleted successfully`)
        refreshTodos()
      })
      .catch((error) => console.log(error))
    }

    function updateTodo(id) {
      navigate(`/todos/${id}`)
    }

    function createNewTodo() {
      navigate(`/todos/-1`)
    }

    return (
      <div className='container'>
        <h1 className="m-5">Things you want to do.</h1>
        {message && <div className="alert alert-warning">{message}</div>}
        <div>
          <table className='table'>
            <thead>
              <tr>
                <th>Description</th>
                <th>Done?</th>
                <th>Target Date</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {
                todos.map(todo => <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td><input type='checkbox'></input></td>
                  <td>{todo.targetDate}</td>
                  <td><button onClick={() => deleteTodo(todo.id)} className="btn btn-warning">Delete</button></td>
                  <td><button onClick={() => updateTodo(todo.id)} className="btn btn-success">Update</button></td>
                </tr>)
              }
            </tbody>
          </table>
        </div>

        <div>
          <button onClick={createNewTodo} className="btn btn-success m-5">Add New Todo</button>
        </div>
      </div>
    )
  }