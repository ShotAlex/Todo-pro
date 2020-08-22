import React from 'react';
import './AppTitle.css';

const AppTitle = ({ todo, done}) => {
  return (
    <div className="app-header">
      <h1> TODO app </h1>
      <h2> {todo} more to do, {done} done</h2>
    </div>
  );
};

export default AppTitle;