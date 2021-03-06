import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoFilter.css';

class TodoFilter extends React.Component {
  render() {
    const { onFilteredTodos, filter } = this.props;
    return (
      <ul className="filters" onClick={(event) => onFilteredTodos(event)}>
        <li>
          <a href="#/" className={classNames({ selected: filter === 'All' })}>
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({ selected: filter === 'Active' })}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({ selected: filter === 'Completed' })}
          >
            Completed
          </a>
        </li>
      </ul>
    );
  }
}

TodoFilter.propTypes = {
  onFilteredTodos: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TodoFilter;
