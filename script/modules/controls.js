import { createRadioGroup } from './createElements.js';
import { addRowsToPage, renderTemplate } from './renderElements.js';
import {
  getFromStorage,
  setUserTodoToStorage,
	removeStorage,
} from './storage.js';

export const formPopupControl = (form, overlay) => {
  let newUser = {};
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    newUser = Object.fromEntries(formData);

    form.reset();
    overlay.classList.remove('is-visible');

		newUser = {
			name: newUser.name,
			password: newUser.password,
			todos: [],
		}
		// console.log('newUser: ', newUser);

    // const {userTodo} = setUserToStorage(newUser);
    // getFromStorage(newUser.password)
    // const userName = getFromStorage(newUser.password)

    // const title = document.querySelector('h3')
    // title.textContent = `ToDo App пользователь: ${userName.name.toUpperCase()}`;
    const { formTodo, importance, btnsWrapper } = renderTemplate(newUser);
    formTodoControl(formTodo, importance, btnsWrapper, newUser);
  });

  return {
    newUser,
  };
};

export const popupControl = (overlay, target) => {
  if (
    target.classList.contains('close') ||
    target.classList.contains('form-overlay')
  ) {
    overlay.classList.remove('is-visible');
  }
};

export const formTodoControl = (formTodo, importance, btnsWrapper, user) => {

  // if (user) {
  //   console.log('userKey: ', user.password);
  // }

	let todo = ''

  const inputTodo = formTodo.querySelector('.form-control');
  const btns = formTodo.querySelectorAll('button');

  btns.forEach((btn) => (btn.disabled = true));

  if (!inputTodo.value.length === null) {
    btns.forEach((btn) => (btn.disabled = true));
  }

  inputTodo.addEventListener('input', () => {
    if (!inputTodo.value.length) {
      btns.forEach((btn) => btn.setAttribute('disabled', true));
      importance.style.display = 'none';
    }
    if (inputTodo.value.trim().length > 0) {
      btns.forEach((btn) => btn.removeAttribute('disabled'));
      importance.style.display = 'block';
    }
  });

  formTodo.addEventListener('click', (e) => {
    if (e.target.classList.contains('reset')) {
      inputTodo.value = '';
      btns.forEach((btn) => btn.setAttribute('disabled', true));
      importance.style.display = 'none';
    }
  });

  formTodo.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newTodo = Object.fromEntries(formData);

    todo = {
      id: Math.random().toString().substring(2, 10),
      todo: newTodo.todo,
      importance: newTodo.importance,
      done: false,
    };

		addRowsToPage(todo)
    setUserTodoToStorage(`${user.password}`, todo);
		deleteContactRow(todo, user.password)
    formTodo.reset();
    importance.style.display = 'none';
    btns.forEach((btn) => btn.setAttribute('disabled', true));
		
		changeStatusTodoControl(user.password, todo)
		
  });

};

const changeStatusDone = (todos, item, userKey) => {
	console.log('item.id: ', item.id);
	todos.map(obj => {
		console.log('obj.id: ', obj.id);
		if(obj.id === item.id && obj.done === false) {
			obj.done === true
		} else {
			obj.done = false
		}
		console.log('todos1: ', todos);
	})

	
}


export const changeStatusTodoControl = (userKey, item) => {
	
	const doneBtn = document.querySelectorAll('.done')
	
	doneBtn.forEach(btn => {
		btn.addEventListener('click', () => {
			const todos = JSON.parse(localStorage.getItem(userKey))
			console.log('todos: ', todos);

			todos.map(item => changeStatusDone(todos, item))
			console.log('todos2: ', todos);
			// item.classList.toggle('task-done')
	})

})

}

export const deleteContactRow = (todo, userKey) => {

const todoForm = document.querySelector('.table-wrapper')
todoForm.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('delete')) {

      // removeStorage(userKey, todo);
      target.closest('.table-light').remove();
    }
  });
};
// deleteContactRow()