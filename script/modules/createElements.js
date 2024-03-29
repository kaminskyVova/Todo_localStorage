import {
  changeStatusTodoControl,
  setDoneTodoItem,
  deleteTodoItem,
  deleteTodoFromStorage,
} from './controls.js';

export const createButtonsGroup = (params) => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper');

  const btns = params.map(({ className, type, text }) => {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.className = className;
    button.style.marginRight = '20px';

    return button;
  });

  btnWrapper.append(...btns);

  return {
    btnWrapper,
    btns,
  };
};

export const createAppContainer = () => {
  const appContainer = document.querySelector('.app-container');
  appContainer.className =
    'app-container vh-100 w-100 d-flex align-items-center justify-content-center flex-column';

  const title = document.createElement('h3');
  title.classList.add('todo-title');
  title.textContent = `ToDo App пользователь: `;

  return {
    appContainer,
    title,
  };
};

export const createRadioGroup = () => {
  const importance = document.createElement('div');
  importance.classList.add('radio-wrapper');
  importance.style.display = 'none';
  importance.insertAdjacentHTML(
    'beforeend',
    `
      <span>Importance:<span/>
        <input type="radio" name="importance" value="light">
      <label for="importance" class="light">Light</label>

      <input type="radio" name="importance" value="warning">
      <label for="importance" class="warning">Warning</label>

      <input type="radio" name="importance" value="danger">
      <label for="importance" class="danger">Danger</label>
  `
  );

  return {
    importance,
  };
};

export const createFormTodo = () => {
  const formTodo = document.createElement('form');
  formTodo.className = 'd-flex flex-column align-items-center mb-3 form-todo';
  const btnsWrapper = document.createElement('div');
  btnsWrapper.className = '';

  const { importance } = createRadioGroup();

  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Добавить',
    },
    {
      className: 'btn btn-warning reset',
      type: 'reset',
      text: 'Очистить',
    },
  ]);

  formTodo.insertAdjacentHTML(
    'beforeend',
    `
    <label class="form-group me-3 mb-3">
      <input type="text" name="todo" class="form-control" placeholder="ввести задачу">
    </label>
		`
  );

  btnsWrapper.append(...buttonGroup.btns);

  formTodo.append(importance, btnsWrapper);

  return {
    formTodo,
    btnsWrapper,
    importance,
  };
};

export const createTableHead = () => {
  const thead = document.createElement('thead');

  const theadTitles = ['№', 'Задача', 'Статус', 'Действия'];

  const tr = document.createElement('tr');

  theadTitles.forEach((elem) => {
    const th = document.createElement('th');
    th.textContent = elem;

    thead.append(th);
  });

  return {
    thead,
    tr,
  };
};

export const createTable = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');
  tableWrapper.style.width = '456px';

  const table = document.createElement('table');
  table.className = 'table table-hover table-bordered';

  const tbody = document.createElement('tbody');

  const { thead, tr } = createTableHead();

  table.append(thead, tbody);

  tableWrapper.append(table);
  return {
    tableWrapper,
    table,
    tbody,
  };
};

export const createRow = (todo, userKey) => {
  const tbody = document.querySelector('tbody');

  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-danger delete',
      type: 'button',
      text: 'Удалить',
    },
    {
      className: 'btn btn-success done',
      type: 'button',
      text: 'Завершить',
    },
  ]);

  const tr = document.createElement('tr');
  tr.classList.add('table-light');

  const rowId = document.createElement('td');
  rowId.classList.add('row__id');

  const tdText = document.createElement('td');
  tdText.classList.add('task');

  const tdCondition = document.createElement('td');
  tdCondition.classList.add('condition');

  if (todo) {
    tdText.textContent = todo.todo;

    if (todo.importance === 'light') {
      tdText.textContent = todo.todo;
      tdText.style.color = 'rgb(190, 202, 17)';
    }
    if (todo.importance === 'warning') {
      tdText.textContent = todo.todo;
      tdText.style.color = 'rgb(255, 136, 0)';
    }
    if (todo.importance === 'danger') {
      tdText.textContent = todo.todo;
      tdText.style.color = 'rgb(255, 38, 0)';
    }
    if (todo.done === false) {
      tdCondition.textContent = 'в процессе';
      tdText.classList.remove('task-done');
      buttonGroup.btns[1].textContent = 'Завершить'
    }
    if (todo.done === true) {
      tdText.classList.add('task-done');
      tdCondition.textContent = 'выполнено';
      buttonGroup.btns[1].textContent = 'Готово'
    }
  }

  const tdBtns = document.createElement('td');
  tdBtns.classList.add('btns');

  tdBtns.append(...buttonGroup.btns);

  tr.append(rowId, tdText, tdCondition, tdBtns);

  tbody.append(tr);

  changeStatusTodoControl(tr, todo, userKey);
  setDoneTodoItem(tr);
  deleteTodoFromStorage(tr, todo, userKey);
  deleteTodoItem(tr);

  return {
    tr,
  };
};
