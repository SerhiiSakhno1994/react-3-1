import React from 'react';
import { nanoid } from 'nanoid';

import Container from './components/Container';
import TodoList from './components/TodoList/TodoList';
import TodoEditor from './components/TodoEditor/TodoEditor';
import Filter from './components/Filter';
// import Form from './components/Form';
// import initalTodos from './components/todos.json';
import Modal from './components/Modal/Modal';
// import Clock from './components/Clock/Clock';
// import Tabs from './components/Tabs/Tabs';
// import tabs from './components/tabs.json';
import IconButton from './components/IconButton/IconButton';
import { ReactComponent as Add } from '../src/icons/add.svg';

class App extends React.Component {
  state = {
    todos: [],
    filter: '',
    showModal: false,
  };
  componentDidMount() {
    // console.log('componentDidMount');
    const todos = localStorage.getItem('todos');
    const parsTodos = JSON.parse(todos);
    // console.log(parsTodos);
    if (parsTodos) {
      this.setState({ todos: parsTodos });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');
    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;
    if (nextTodos !== prevTodos) {
      // console.log('оновилось поле Todos записую тудус в сховище');
      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }
    if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
      this.toggleModal();
    }
  }

  addTodo = text => {
    // console.log(text);
    const todo = {
      id: nanoid(),
      text,
      completed: false,
    };
    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
    // this.toggleModal();
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    // console.log(todoId);
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }
    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };

  formSubmitHandler = data => {
    // console.log(data);
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { todos, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizeFilter),
    );
  };

  calculeteCompledetTodoCaunt = () => {
    const { todos } = this.state;
    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { todos, filter, showModal } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculeteCompledetTodoCaunt();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        <IconButton onClick={this.toggleModal} aria-label="Добавить todo">
          <Add width="40px" height="40px" fill="#fff" />
        </IconButton>
        {/* <Tabs items={tabs} /> */}

        {/* {showModal && <Clock />} */}
        {/* <button type="button" onClick={this.toggleModal}>
          Відкрити модалку
        </button> */}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
          </Modal>
        )}
        {/* <Form onSubmit={this.formSubmitHandler} /> */}
        <div>
          <p>Загальна кількість:{totalTodoCount} </p>
          <p>Кількість виконаних:{completedTodoCount} </p>
        </div>

        <Filter value={filter} onChange={this.changeFilter} />
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;
