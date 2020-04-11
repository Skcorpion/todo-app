import React from 'react';
// import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

class TodoList extends React.Component {
  render() {
    const {
      items,
      onTaskToggle,
      onDeleteItem,
      filter,
      onEnterTask,
    } = this.props;
    const listOfItems = items
      .filter((item) => {
        if (filter === 'Active') {
          return item.completed === false;
        } else if (filter === 'Completed') {
          return item.completed === true;
        }
        return true;
      })
      .map((item) => (
        <TodoItem
          key={item.id}
          onTaskToggle={onTaskToggle}
          item={item}
          onDeleteItem={onDeleteItem}
          onEnterTask={onEnterTask}
        />
      ));

    return <ul className="todo-list">{listOfItems}</ul>;
  }
}

export default TodoList;
