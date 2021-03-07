import React, {useState, useEffect, useRef} from 'react';
import {nanoid} from 'nanoid';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import {usePrevious} from './components/Todo';

// const filter = (keyword, todos) => {
//   switch (keyword) {
//     case 'all':
//       return todos;
//     case 'active':
//       return todos.filter(todo => todo.completed === false);
//     case 'completed':
//       return todos.filter(todo => todo.completed === true);
//   }
// }
const FILTER_MAP = {
  All: () => true,
  Active: todo => !todo.completed,
  Completed: todo => todo.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App({data}) {
  const [todos, setTodos] = useState(data);
  const [filter, setFilter] = useState('All');

  // const filteredTodos = filter(keyword, todos);

  // list of filter buttons
  const filterButtons = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name} pressed={name === filter} setFilter={setFilter} />
  ));

  const addTask = (name) => {
    const id = `todo-${nanoid()}`;
    setTodos([...todos, {id, name, completed: false}]);
  }

  const handleOnCheckChange = (targetTodo) => {
    const newTodos = todos.map(todo => todo.id === targetTodo.id ? {...todo, completed: !todo.completed} : todo);
    console.log(newTodos);
  }

  const handleOnClickDelete = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);

    setTodos(newTodos);
  }

  const handleOnClickSave = (id, newName) => {
    const newTodos = todos.map(todo => todo.id === id ? {...todo, name: newName} : todo);

    setTodos(newTodos);
    console.log(newTodos);
  }

  // const handleOnClickFilter = (name) => {
  //   setFilter(name);
  // }

  const listHeadingRef = useRef(null);
  const prevTodosLength = usePrevious(todos.length);

  useEffect(() => {
    if (todos.length - <prevTodosLength></prevTodosLength> === -1) {
      listHeadingRef.current.focus();
    }
  }, [todos.length, prevTodosLength]);

  return (
    <div className="todoapp stack-large">
      <h1>HandyTodo</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterButtons}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {todos.length > 1 ? `${todos.length} tasks remaining` : `${todos.length} task remaining`}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {todos.filter(FILTER_MAP[filter]).map(todo => <Todo key={todo.id} id={todo.id} name={todo.name} completed={todo.completed} onCheckChange={() => handleOnCheckChange(todo)} onClickDelete={handleOnClickDelete} onClickSave={handleOnClickSave} />)}
      </ul>
    </div>
  );
}

export default App;
