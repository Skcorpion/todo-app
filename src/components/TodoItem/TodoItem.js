import React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    console.log('componentDidUpdate', this.props.item.id);
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
            console.log(event.key);
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

export default TodoItem;
