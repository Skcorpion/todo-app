import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TodoItem extends React.PureComponent {
  render() {
    const { onTaskToggle, item } = this.props;
    const { id, title, completed } = item;
    console.log('render', id);

    return (
      //   <li className="editing">
      <li className={classNames({ completed: completed })}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${id}`}
            checked={completed}
            onChange={(event) => onTaskToggle(event)}
          />
          <label htmlFor={`todo-${id}`}>{title}</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li>
    );
  }
}

export default TodoItem;
