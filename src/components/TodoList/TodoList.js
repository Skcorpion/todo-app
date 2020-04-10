import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import TodoFilter from '../TodoFilter/TodoFilter';

class TodoList extends React.Component {
  render() {
    const { items, onTaskToggle } = this.props;
    const listOfItems = items.map((item) => (
      <TodoItem key={item.id} onTaskToggle={onTaskToggle} item={item} />
    ));

    return <ul className="todo-list">{listOfItems}</ul>;
  }
}

export default TodoList;
