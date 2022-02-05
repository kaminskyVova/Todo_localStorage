
export const setUserTodoToStorage = (userKey, todo) => {
	
	let todos = []
	if(userKey && todo) {
		if(localStorage.length > 0) {
			todos = JSON.parse(localStorage.getItem(userKey))
		} else {
			// todos.push(todo);
			localStorage.setItem(`${userKey}`, JSON.stringify(todo))
			localStorage.setItem(`${userKey}`, JSON.stringify(todos));
		}
		if(todo) {
			if(todos === null) {
				todos =[]
			}
			todos.push(todo);

			localStorage.setItem(`${userKey}`, JSON.stringify(todos));
		}
	} 

};

export const getFromStorage = (userKey) => {
  const userTodo = JSON.parse(localStorage.getItem(userKey));
  return localStorage.length > 0 ? userTodo : [];
};

export const removeStorage = (key, todo) => {
  let todos = JSON.parse(localStorage.getItem(key));
  let newTodos = [];
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id != todo.id) {
      newTodos.push(todos[i]);
    }
  }

  localStorage.setItem(key, JSON.stringify(newTodos));
};