import React, {Component} from 'react';
import './SearchPanel.css';
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter';

export default class SearchPanel extends Component {
  state = {
    term: ''
  }

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  }

  render() {

    return (
      <div className="search-panel">
        <input 
          className="todo-list list-group-item"
          placeholder="input U task"
          value={this.state.term}
          onChange={this.onSearchChange}
        />
  
      </div>
    );
  }
};

