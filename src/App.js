import React from 'react';
import TodoList from './components/TodoList/TodoList';
import TodoFilter from './components/TodoFilter/TodoFilter';

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
      toggleAll: true,
      title: '',
    };
  }

  onSubmitNewTodo = (event) => {
    event.preventDefault();
    const title = this.state.title;
    if (title !== '') {
      this.setState((prevState) => {
        const todo = { id: prevState.todos.length, title, completed: false };
        const newTodos = [...prevState.todos];
        newTodos.push(todo);
        return {
          todos: newTodos,
          toggleAll: true,
          title: '',
        };
      });
    }
  };

  onChangeInput = (event) => {
    const title = event.target.value;
    this.setState({
      title,
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

  render() {
    const { todos, title } = this.state;
    const left = todos.filter((todo) => !todo.completed).length;

    return (
      <section className="todoapp">
        <header className="header">
          <form onSubmit={(event) => this.onSubmitNewTodo(event)}>
            <h1>todos</h1>

            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={title}
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

          <TodoList onTaskToggle={this.onTaskToggle} items={todos} />
        </section>

        <footer className="footer">
          <span className="todo-count">
            {left}
            {` item${left !== 1 ? 's' : ''} left`}
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected">
                All
              </a>
            </li>

            <li>
              <a href="#/active">Active</a>
            </li>

            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>

          <button type="button" className="clear-completed">
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
