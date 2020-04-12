import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

class TodoList extends React.Component {
  render() {
    const {
      items,
      filter,
      onTaskToggle,
      onDeleteItem,
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
          item={item}
          onTaskToggle={onTaskToggle}
          onDeleteItem={onDeleteItem}
          onEnterTask={onEnterTask}
        />
      ));

    return <ul className="todo-list">{listOfItems}</ul>;
  }
}

TodoList.propsTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  onTaskToggle: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onEnterTask: PropTypes.func.isRequired,
};

export default TodoList;
