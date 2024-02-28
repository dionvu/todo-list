import Project from "./project";

export enum Priority {
  high = 'high',
  medium = 'medium',
  low = 'low',
}

export default class todoItem {
  title: string;
  description: string;
  priority: Priority;
  dom: {
    title: HTMLElement;
    description: HTMLElement;
    priority: HTMLElement;
    removeButton: HTMLElement;
  };

  constructor(title: string, description: string, priority: Priority) {
    this.title = title;
    this.description = description;
    this.priority = priority;
  }

  // title, description, prior, remove
  setDomElements(elements: HTMLElement[]): void {
    this.dom = {
      title: elements[0],
      description: elements[1],
      priority: elements[2],
      removeButton: elements[3],
    }
  }
}

export function addTodoItem(todoItemList: todoItem[], title: string, description: string): void {
  todoItemList.push(new todoItem(title, description, Priority.high));
}

export function createTodoDialog(): {
  dialog: HTMLDialogElement, todoForm: HTMLFormElement,
  titleInput: HTMLInputElement, descriptionInput: HTMLInputElement,
  submit: HTMLElement
} {
  const todoDialog = document.createElement('dialog');
  todoDialog.id = 'todo-dialog';

  const todoForm = document.createElement('form');
  todoForm.id = 'todo-todoForm';

  const titleLabel = document.createElement('label');
  titleLabel.htmlFor = 'todo-title';
  titleLabel.textContent = 'Title';
  const titleInput = document.createElement('input');
  titleInput.id = 'todo-title';
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.placeholder = 'Title';
  titleInput.required = true;

  const descriptionLabel = document.createElement('label');
  descriptionLabel.htmlFor = 'todo-description';
  descriptionLabel.textContent = 'Description';
  const descriptionInput = document.createElement('input');
  descriptionInput.id = 'todo-description';
  descriptionInput.type = 'text';
  descriptionInput.name = 'description';
  descriptionInput.placeholder = 'Description';
  descriptionInput.required = true;


  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';

  todoForm.appendChild(titleLabel);
  todoForm.appendChild(titleInput);
  todoForm.appendChild(descriptionLabel);
  todoForm.appendChild(descriptionInput);
  todoForm.appendChild(submitButton);

  todoDialog.appendChild(todoForm);

  let obj = {
    dialog: todoDialog as HTMLDialogElement,
    todoForm: todoForm as HTMLFormElement,
    titleInput: titleInput as HTMLInputElement,
    descriptionInput: descriptionInput as HTMLInputElement,
    submit: submitButton as HTMLElement,
  };
  return obj;
}

export function displayTodoItemsList(project: Project): void {
  const todoListContainer = document.getElementById('todo-container');
  todoListContainer.innerHTML = '';

  project.todoItemList.forEach((item: todoItem) => {

    const itemContainer = document.createElement('div');

    const title = document.createElement('h2');
    title.textContent = item.title;

    const description = document.createElement('p');
    description.textContent = item.description;

    const removeButton = createRemoveButton(itemContainer, item, project);

    const priority = document.createElement('h3');
    if (item.priority === Priority.high) priority.textContent = `Priority: ${Priority.high}`;

    itemContainer.appendChild(title);
    itemContainer.appendChild(description);
    itemContainer.appendChild(priority);
    itemContainer.appendChild(removeButton);
    todoListContainer.appendChild(itemContainer);

    item.setDomElements([title, description, removeButton, priority])
  });
}

function createRemoveButton(container: HTMLElement, item: todoItem, project: Project): HTMLElement {
  const button = document.createElement('button');
  button.addEventListener('click', () => {
    container.remove();
    removeTodoItem(project, item);
  });
  button.textContent = 'remove';
  return button;
}

function removeTodoItem(project: Project, targetItem: todoItem) {
  const index = project.todoItemList.findIndex((element: todoItem) => {
    if (project.todoItemList.indexOf(element) === project.todoItemList.indexOf(targetItem)) return true;
  });
  project.todoItemList.splice(index, 1);
  console.table(project.todoItemList);
}
