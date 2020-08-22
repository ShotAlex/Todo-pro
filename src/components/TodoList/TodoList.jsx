import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';
import './TodoList.css';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone}  ) => {

  const elements = todos.map((item) => {
    const { id, ...otherProps} = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem 
        {...otherProps} 
        onDeleted={ () => onDeleted(id) } 
        onToggleImportant={ () => onToggleImportant(id)}
        onToggleDone={ () => onToggleDone(id)} />
      </li>
    );
  })

  return (
    <ul className="list-group">
      {elements}
    </ul>
  );
};

export default TodoList;