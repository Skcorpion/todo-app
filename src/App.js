import React from 'react';
import TodoList from './components/TodoList/TodoList';
import TodoFilter from './components/TodoFilter/TodoFilter';
import classNames from 'classnames';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmitNewTodo = this.onSubmitNewTodo.bind(this);
    this.onTaskToggle = this.onTaskToggle.bind(this);
    this.onToggleAll = this.onToggleAll.bind(this);

    this.state = {
      todos: [
        { id: 0, title: 'aaa', completed: false },
        { id: 1, title: 'bbb', completed: true },
        { id: 2, title: 'ccc', completed: false },
        { id: 3, title: 'ddd', completed: false },
      ],
      filter: 'All',
      toggleAll: true,
      inputValue: '',
      nextId: 0,
    };
  }

  onSubmitNewTodo = (event) => {
    event.preventDefault();
    const inputValue = this.state.inputValue;
    if (inputValue !== '') {
      this.setState((prevState) => {
        let id = prevState.nextId;
        if (prevState.nextId === 0) {
          id = prevState.todos.length;
        }

        const todo = {
          id: id, //???
          title: inputValue,
          completed: false,
        };

        return {
          todos: [...prevState.todos, todo],
          toggleAll: true,
          inputValue: '',
          nextId: id + 1,
        };
      });
    }
  };

  onChangeInput = (event) => {
    const inputValue = event.target.value;
    this.setState({
      inputValue,
    });
  };

  onTaskToggle = (event) => {
    console.log(event.target.id);
    const id = event.target.id;

    this.setState((prevState) => {
      return {
        todos: prevState.todos.map((todo) => {
          if (`todo-${todo.id}` !== id) {
            return todo;
          }
          return { ...todo, completed: !todo.completed };
        }),
        toggleAll: true,
      };
    });
  };

  onToggleAll = () => {
    this.setState((prevState) => {
      return {
        todos: prevState.todos.map((todo) => {
          if (todo.completed === prevState.toggleAll) {
            return todo;
          }
          return { ...todo, completed: prevState.toggleAll };
        }),
        toggleAll: !prevState.toggleAll,
      };
    });
  };

  onDeleteItem = (id) => {
    this.setState((prevState) => {
      return {
        todos: prevState.todos.filter((todo) => todo.id !== id),
      };
    });
  };

  onClearCompleted = () => {
    this.setState((prevState) => {
      return {
        todos: prevState.todos.filter((todo) => todo.completed === false),
        toggleAll: true,
      };
    });
  };

  onFilteredTodos = (event) => {
    const target = event.target;
    if (target.tagName === 'A') {
      const value = target.innerHTML;
      this.setState((prevState) => {
        if (prevState !== value) {
          return {
            filter: value,
          };
        }
      });
    }
  };

  onEnterTask = (editValue, id) => {
    this.setState((prevState) => {
      return {
        todos: prevState.todos.map((todo) => {
          if (id !== todo.id) {
            return todo;
          }

          return { ...todo, title: editValue };
        }),
      };
    });
  };

  render() {
    const { todos, inputValue, filter } = this.state;
    const left = todos.filter((todo) => !todo.completed).length;

    return (
      <section className="todoapp">
        <header className="header">
          <form onSubmit={(event) => this.onSubmitNewTodo(event)}>
            <h1>todos</h1>

            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(event) => this.onChangeInput(event)}
            />
          </form>
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={() => this.onToggleAll()}
            checked={!this.state.toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            onTaskToggle={this.onTaskToggle}
            onDeleteItem={this.onDeleteItem}
            onEnterTask={this.onEnterTask}
            items={todos}
            filter={filter}
          />
        </section>

        <footer
          className={classNames('footer', {
            'footer-empty': todos.length === 0,
          })}
        >
          <span className="todo-count">
            {left}
            {` item${left !== 1 ? 's' : ''} left`}
          </span>

          <TodoFilter onFilteredTodos={this.onFilteredTodos} filter={filter} />

          <button
            type="button"
            className="clear-completed"
            onClick={() => this.onClearCompleted()}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
