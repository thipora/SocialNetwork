import React from "react";
import { useState, useEffect, useContext } from "react"
import Todo from "./Todo.jsx"
import AddNewTodo from './AddNewTodo'
import { UserContext } from '../UserProvider';
import { Link } from "react-router-dom";


function Todos() {
  const [todos, setTodos] = useState([])
  const [originaltodos, setOriginaltodos] = useState([]);
  const [addTodo, setAddTodo] = useState(false)
  const [sortCriteria, setSortCriteria] = useState('none');
  const [searchCriteria, setSearchCriteria] = useState('none');
  const [searchInputCriteria, setSearchInputCriteria] = useState('');
  const { userID } = useContext(UserContext);
  const token = localStorage.getItem("TOKEN");

  useEffect(() => {
    fetch(`http://localhost:8080/todos/${userID}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
  }, [])

  useEffect(() => {
    setOriginaltodos([...todos]);
    sortTodos();
  }, [sortCriteria]);


  function deleteFromArr(todoId) {
    const updatedArr = todos.filter(item => item.id !== todoId);
    setTodos(updatedArr);
  }

  function updateArr(todoId, title) {
    setTodos(todos => todos.map((todo) =>
      (todo.id === todoId ? { ...todo, title: title } : todo)
    ));
  }


  function addToArr(todo) {
    setTodos((prevTodos) => [...prevTodos, todo]);
  }

  function handleSortChange(event) {
    setSortCriteria(event.target.value);
    sortTodos();
  };

  function handleSearchChange(event) {
    setSearchCriteria(event.target.value);
  };

  function sortTodos() {
    switch (sortCriteria) {
      case 'sequential':
        let tempTodos = [...originaltodos];
        tempTodos.sort((a, b) => (parseInt(a.id) < parseInt(b.id)) ? -1 : 1);
        setTodos(tempTodos);
        break;
      case 'execution':
        setTodos(todos.slice().sort((a, b) => {
          if (a.completed && !b.completed) {
            return -1;
          } else if (!a.completed && b.completed) {
            return 1;
          } else {
            return 0;
          }
        })
        );
        break;
      case 'alphabetical':
        let tempTodos1 = [];
        todos.map(t => tempTodos1.push(t));
        tempTodos1.sort((a, b) => (a.title.toUpperCase() < b.title.toUpperCase()) ? -1 : 1);
        setTodos(tempTodos1)
        break;
      case 'random':
        setTodos(todos.slice().sort(() => Math.random() - 0.5));
        break;
    }
  };


  function searchedTodos(todo) {
    switch (searchCriteria) {
      case 'sequential':
        return (
          todo.id.toString().includes(searchInputCriteria)
        );
      case 'execution':
        return (
          (searchInputCriteria === '' || (todo.completed ? 'true' : 'false') === searchInputCriteria)
        );
      case 'alphabetical':
        return (
          todo.title.toLowerCase().includes(searchInputCriteria.toLowerCase())
        );
      case 'none':
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      <Link to={`/user/${userID}/home`}>Back...</Link>
      <h1>TODOS</h1>

      <select value={sortCriteria} onChange={handleSortChange}>
        <option value="sequential">sequential</option>
        <option value="execution">execution</option>
        <option value="alphabetical">alphabetical</option>
        <option value="random">random</option>
        <option value="none">none</option>
      </select>

      <div>
        <select value={searchCriteria} onChange={handleSearchChange}>
          <option value="sequential">sequential</option>
          <option value="execution">execution</option>
          <option value="alphabetical">alphabetical</option>
          <option value="none">none</option>
        </select>


        {searchCriteria !== 'none' && (
          <input
            type='text'
            placeholder="search term"
            value={searchInputCriteria}
            onChange={(event) => setSearchInputCriteria(event.target.value)}
          />
        )}
      </div>

      <button onClick={() => { setAddTodo(!addTodo) }}>Add Todo</button>
      {addTodo && <AddNewTodo addToArr={addToArr} />}
      {todos.map((todo) => { return (searchedTodos(todo) && <Todo key={todo.id} todo={todo} deleteFromArr={deleteFromArr} updateArr={updateArr} />) })}
    </>
  )
}

export default Todos