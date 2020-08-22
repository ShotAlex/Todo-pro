import React, { Component } from 'react';
import AppTitle from '../AppTitle/AppTitle';
import SearchPanel from '../SearchPanel/SearchPanel';
import TodoList from '../TodoList/TodoList';
import ItemAddForm from '../AddItem/ItemAddForm';
import './App.css';
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter';

export default class App extends Component {
  maxId = 10;

  state = {
    todoData: [
      this.createTodoItem('Task example')
    ],
    term: '',
    filter: 'all'
  }

  createTodoItem(label) {
    return {
      id: this.maxId++,
      label,
      important: false,
      done: false
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArr = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)]

      return {
        todoData: newArr
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)

    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ]

      return {
        todoData: newArr
      };
    });
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ]

  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  }

  onSearchChange = (term) => {
    this.setState({ term })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  search(items, term) {
    if (term.length === 0) return items;

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
        break;
      case 'active':
        return items.filter(item => !item.done);
        break;
      case 'done':
        return items.filter(item => item.done);
        break;
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state
    const visibleItems = this.filter(
      this.search(todoData, term),
      filter
    );

    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount

    return (
      <div className="app">
        <AppTitle
          todo={todoCount}
          done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange} />
          <ItemStatusFilter 
           filter={filter}
           onFilterChange={this.onFilterChange} />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAddForm
          onItemAdded={this.addItem} />
      </div>
    );
  }
};