import { formPopupControl, formTodoControl,changeStatusTodoControl, deleteContactRow } from './controls.js';
import {
  createButtonsGroup,
  createAppContainer,
  createFormTodo,
  createRadioGroup,
  createTable,
	createRow,
} from './createElements.js';

import { getFromStorage } from './storage.js';


export const renderRegisterForm = (body) => {
  const overlay = document.createElement('div');
  overlay.classList.add('form-overlay');

  const form = document.createElement('form');
  form.classList.add('form');

  form.insertAdjacentHTML(
    'beforeend',
    `
			<button class="close" type="button"></button>
			<h2 class="form-title">Добавить пользователя</h2>
			<div class="form-group">
				<label class="form-label" for="name">Имя:</label>
				<input class="form-input" name="name" id="name" type="text" required>
			</div>
			<div class="form-group">
				<label class="form-label" for="password">Пароль:</label>
				<input class="form-input" name="password" id="password" type="password" required>
			</div>
		`
  );

  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Очистить',
    },
  ]);

  form.append(...buttonGroup.btns);

  overlay.append(form);
  overlay.classList.add('form-overlay');
  overlay.classList.add('is-visible');
  body.append(overlay);

  return { form, overlay };
};

export const renderContactsFromLocalStorage = (password) => {
  let todos = [];
  if (localStorage.length > 0) {
    todos = getFromStorage(`${password}`);

		if(todos != null) {
			
		todos.map(item => createRow(item))
		}
    return todos;
  } else {
    return;
  }
};


export const addRowsToPage = (todo) => {
	// const tbody = document.querySelector('tbody')
	createRow(todo);
	// changeStatusTodoControl(todo)
};


export const renderTemplate = (user, importanceVal, todoText) => {
	console.log('user: ', user.password);
	
	
	
	const { appContainer, title } = createAppContainer();
	const { formTodo, importance, btnsWrapper } = createFormTodo();
	const { tableWrapper, table, tbody } = createTable();
	
	appContainer.append(title, formTodo, tableWrapper);
	
	if(user) {
		// console.log('user: ', user);
		renderContactsFromLocalStorage(user.password)
		// console.log('todo: ', todo);
		title.textContent = `ToDo App пользователь: ${user.name.toUpperCase()}`;
		changeStatusTodoControl(user.password)
		deleteContactRow()
	}
	

  return {
    title,
    formTodo,
    importance,
    table,
		btnsWrapper,
  };
};
