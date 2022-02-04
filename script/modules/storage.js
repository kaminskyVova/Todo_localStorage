export const setUserToStorage = (user) => {
	localStorage.setItem(`${user.password}`, JSON.stringify(user));
};

export const setUserTodoToStorage = (userKey, todos) => {
	if(userKey && todos) {
		localStorage.setItem(`${userKey}`, JSON.stringify(todos))
	}
};

export const getFromStorage = (userKey) => {
  const userTodo = JSON.parse(localStorage.getItem(userKey));
  return localStorage.length > 0 ? userTodo : {};
};


export const setStorage = (key, contact) => {
  let contacts = [];
  if (localStorage.length > 0) {
    contacts = JSON.parse(localStorage.getItem(key));
  } else {
    localStorage.setItem(key, JSON.stringify(contact));
  }
  if (contacts) {
    localStorage.removeItem(key);
    contacts.push(contact);
    localStorage.setItem(key, JSON.stringify(contacts));
  }
};
