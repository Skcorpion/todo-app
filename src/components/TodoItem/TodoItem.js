import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoItem.css';

class TodoItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      editValue: this.props.item.title,
    };
    this.textInput = React.createRef();
  }

  onTaskChange = (event) => {
    const input = event.target.value;

    this.setState({
      editValue: input,
    });
  };

  componentDidMount() {
    document.addEventListener('click', (event) => {
      const { editing, editValue } = this.state;
      const {
        item: { title, id },
        onEnterTask,
      } = this.props;

      if (editing && event.target.value !== title) {
        this.setState({ editing: false });
        onEnterTask(editValue, id);
      }
    });
  }

  componentDidUpdate() {
    this.textInput.current.focus();
  }

  render() {
    const { editing, editValue } = this.state;
    const {
      onTaskToggle,
      item: { id, title, completed },
      onDeleteItem,
      onEnterTask,
    } = this.props;

    return (
      <li
        className={classNames({
          completed: completed,
          editing: editing,
        })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${id}`}
            checked={completed}
            onChange={(event) => onTaskToggle(event)}
          />
          <label
            onDoubleClick={() => {
              this.setState({ editing: true });
            }}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => onDeleteItem(id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={editValue}
          ref={this.textInput}
          onChange={(event) => {
            this.onTaskChange(event);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              this.setState({ editing: false });
              onEnterTask(editValue, id);
            } else if (event.key === 'Escape') {
              this.setState({
                editing: false,
                editValue: title,
              });
            }
          }}
        />
      </li>
    );
  }
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onTaskToggle: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onEnterTask: PropTypes.func.isRequired,
};

export default TodoItem;
