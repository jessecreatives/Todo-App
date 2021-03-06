import React, {useState} from 'react';
import {nanoid} from 'nanoid';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

function App({data}) {
  const [todos, setTodos] = useState(data);

  const addTask = (name) => {
    const id = `todo-${nanoid()}`;
    setTodos([...todos, {id, name, completed: false}]);
  }
  return (
    <div className="todoapp stack-large">
      <h1>HandyTodo</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton name="all" pressed="true" />
        <FilterButton name="active" pressed="false" />
        <FilterButton name="completed" pressed="false" />
      </div>
      <h2 id="list-heading">
        3 tasks remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {todos.map(todo => <Todo key={todo.id} id={todo.id} name={todo.name} completed={todo.completed} />)}
      </ul>
    </div>
  );
}

export default App;
