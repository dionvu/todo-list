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
    removeButton: HTMLButtonElement;
  };

  constructor(title: string, description: string, priority: Priority) {
    this.title = title;
    this.description = description;
    this.priority = priority;
  }

  setDomElements(obj: { title: HTMLElement, description: HTMLElement, priority: HTMLElement, removeButton: HTMLButtonElement }): void {
    this.dom = {
      title: obj.title,
      description: obj.description,
      priority: obj.priority,
      removeButton: obj.removeButton,
    };

    this.setPriority(Priority.low);

    this.dom.priority.addEventListener('click', this.cyclePriority.bind(this));
    console.table(this);
  }

  cyclePriority() {
    console.table(this);
    if (this.priority === Priority.high) {
      this.setPriority(Priority.low);
    }

    else if (this.priority === Priority.medium) {
      this.setPriority(Priority.high);
    }
    else {
      this.setPriority(Priority.medium);
    }
  }

  setPriority(priority: Priority) {
    if (priority === Priority.high) {
      this.priority = Priority.high;
      this.dom.priority.textContent = `Priority: ${Priority.high}`;
      this.dom.priority.style.color = 'red';
    }

    else if (priority === Priority.medium) {
      this.priority = Priority.medium;
      this.dom.priority.textContent = `Priority: ${Priority.medium}`;
      this.dom.priority.style.color = 'orange';
    }
    else {
      this.priority = Priority.low;
      this.dom.priority.textContent = `Priority: ${Priority.low}`;
      this.dom.priority.style.color = 'green';
    }
  }
}



export function addTodoItem(todoItemList: todoItem[], title: string, description: string): void {
  todoItemList.push(new todoItem(title, description, Priority.low));
}

export function createTodoDialog(): {
  dialog: HTMLDialogElement, todoForm: HTMLFormElement,
  titleInput: HTMLInputElement, descriptionInput: HTMLInputElement,
  submit: HTMLButtonElement
} {
  const todoDialog = document.createElement('dialog') as HTMLDialogElement;
  todoDialog.id = 'todo-dialog';

  const todoForm = document.createElement('form') as HTMLFormElement;
  todoForm.id = 'todo-todoForm';

  const titleLabel = document.createElement('label');
  titleLabel.htmlFor = 'todo-title';
  titleLabel.textContent = 'Title';
  const titleInput = document.createElement('input') as HTMLInputElement;
  titleInput.id = 'todo-title';
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.placeholder = 'Title';
  titleInput.required = true;

  const descriptionLabel = document.createElement('label');
  descriptionLabel.htmlFor = 'todo-description';
  descriptionLabel.textContent = 'Description';
  const descriptionInput = document.createElement('input') as HTMLInputElement;
  descriptionInput.id = 'todo-description';
  descriptionInput.type = 'text';
  descriptionInput.name = 'description';
  descriptionInput.placeholder = 'Description';
  descriptionInput.required = true;


  const submitButton = document.createElement('button') as HTMLButtonElement;
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';

  todoForm.appendChild(titleLabel);
  todoForm.appendChild(titleInput);
  todoForm.appendChild(descriptionLabel);
  todoForm.appendChild(descriptionInput);
  todoForm.appendChild(submitButton);

  todoDialog.appendChild(todoForm);

  let obj = {
    dialog: todoDialog,
    todoForm: todoForm,
    titleInput: titleInput,
    descriptionInput: descriptionInput,
    submit: submitButton,
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

    const removeButton = createRemoveButton(itemContainer, item, project) as HTMLButtonElement;

    const priority = document.createElement('h3');
    if (item.priority === Priority.low) priority.textContent = `Priority: ${Priority.low}`;
    else if (item.priority === Priority.medium) priority.textContent = `Priority: ${Priority.medium}`;
    else priority.textContent = `Priority: ${Priority.high}`;

    itemContainer.appendChild(title);
    itemContainer.appendChild(description);
    itemContainer.appendChild(priority);
    itemContainer.appendChild(removeButton);
    todoListContainer.appendChild(itemContainer);

    item.setDomElements({ title, description, priority, removeButton });
  });
}

function createRemoveButton(container: HTMLElement, item: todoItem, project: Project): HTMLButtonElement {
  const button = document.createElement('button') as HTMLButtonElement;
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
