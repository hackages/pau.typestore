import { reducer} from './store/reducers';
import { Store } from './store/store';
import {RemoveTodo, AddTodo } from './store/actions';

import { renderTodos } from './utils';

const input = document.querySelector('input'); // What would be the type of this?
const button = document.querySelector('button') // What would be the type of this?
const destroy = document.querySelector('.unsubscribe') // What would be the type of this?
const todoList = document.querySelector('.todos') // What would be the type of this?

const reducers = {
  todos: reducer,
};


// TODO: Store constructor should work with one argument
const store = new Store(reducers);

button.addEventListener(
  'click',
  () => {
    if (!input.value.trim()) return;

    const todo = { label: input.value, complete: false };

    store.dispatch(new AddTodo(todo));

    input.value = '';
  },
  false
);

const unsubscribe = store.subscribe(state => {
  renderTodos(state.todos.data);
});

destroy.addEventListener('click', unsubscribe, false);

todoList.addEventListener('click', function(event) {
  const target = event.target; // What would the type of this?
  if (target.nodeName.toLowerCase() === 'button') {
    const todo = JSON.parse(target.getAttribute('data-todo') as any);
    store.dispatch(new RemoveTodo(todo));
  }
});

store.subscribe(state => console.log('STATE =>', state));
