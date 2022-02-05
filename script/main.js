import {
  renderRegisterForm,
  renderTemplate,
} from './modules/renderElements.js';
import { formPopupControl, changeStatusTodoControl } from './modules/controls.js';
import { popupControl, formTodoControl } from './modules/controls.js';
import { getFromStorage } from './modules/storage.js';
import { createRadioGroup } from './modules/createElements.js';

{
  const init = () => {
    const body = document.querySelector('body');
    const { form, overlay } = renderRegisterForm(body);

    formPopupControl(form, overlay);
    // renderTemplate();
    // formTodoControl()
    // formTodoControl(formTodo, importance)

    // const { importance } = createRadioGroup();
    // renderTemplate()

    // const { formTodo, importance, btnsWrapper } = renderTemplate(newUser, newUser.password, userTodo);
    // formTodoControl(formTodo, importance, btnsWrapper, newUser);
    // changeStatusTodoControl()
    body.addEventListener('click', (e) => {
      const target = e.target;
      popupControl(overlay, target);
      // formTodoControl(formTodo, target, importance);
    });
  };
  window.todo = init;
}
