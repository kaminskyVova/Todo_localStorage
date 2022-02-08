export const getFromStorage = (userKey) => {
  const userTodo = JSON.parse(localStorage.getItem(userKey));
  return localStorage.length > 0 ? userTodo : [];
};


export const setUserTodoToStorage = (userKey, todo) => {
	console.log('userKey: ', userKey);
	
	let todos = []
	if(userKey && todo) {
		if(localStorage.length > 0) {
			todos = JSON.parse(localStorage.getItem(userKey))
		} 
		if(todo) {
			if(todos === null) {
				todos =[]
			}

			todos.push(todo);
			localStorage.setItem(`${userKey}`, JSON.stringify(todos));
		}

		return {todo}

		// todos.filter(item => {
		// 	for(let i = 0; i < todos.length; i++) {
		// 		if(todos[i].todo === item.todo) {
		// 			return false
		// 		}
		// 		return todos.push(item)
		// 	}
		// })

		// const newTodos = [...filterTodos, ...todos]
		// localStorage.setItem(`${userKey}`, JSON.stringify(newTodos));
	} else {
		return
	}

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