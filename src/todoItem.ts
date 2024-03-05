import Project from "./project";
import { removeTodoItem } from "./project";

export enum Priority {
  high = 'high',
  medium = 'medium',
  low = 'low',
}

export default class TodoItem {
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

    this.setPriority(this.priority);

    this.dom.priority.addEventListener('click', this.cyclePriority.bind(this));
    console.table(this);
  }

  cyclePriority() {
    console.table(this);
    if (this.priority === Priority.high)
      this.setPriority(Priority.low);
    else if (this.priority === Priority.medium)
      this.setPriority(Priority.high);
    else
      this.setPriority(Priority.medium);
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

export function displayTodoItemsList(project: Project): void {
  const todoListContainer = document.getElementById('todo-container');
  todoListContainer.innerHTML = '';

  project.todoItemList.forEach((item: TodoItem) => {

    const itemContainer = document.createElement('div');
    itemContainer.classList.add('todo');

    const title = document.createElement('h2');
    title.textContent = item.title;

    const description = document.createElement('p');
    description.textContent = item.description;

    const removeButton = createRemoveButton(itemContainer, item, project) as HTMLButtonElement;

    const priority = document.createElement('h3');

    itemContainer.appendChild(title);
    itemContainer.appendChild(description);
    itemContainer.appendChild(priority);
    itemContainer.appendChild(removeButton);
    todoListContainer.appendChild(itemContainer);

    item.setDomElements({ title, description, priority, removeButton });
  });
}

export function createTodoDialog(): {
  dialog: HTMLDialogElement, todoForm: HTMLFormElement,
  titleInput: HTMLInputElement, descriptionInput: HTMLInputElement,
  submit: HTMLButtonElement
} {
  const todoDialog = document.createElement('dialog') as HTMLDialogElement;
  todoDialog.id = 'todo-dialog';

  const todoForm = document.createElement('form') as HTMLFormElement;
  todoForm.id = 'todo-form';

  const titleLabel = document.createElement('label');
  titleLabel.htmlFor = 'todo-title';
  titleLabel.textContent = 'Title';
  const titleInput = document.createElement('input') as HTMLInputElement;
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.placeholder = 'Title';
  titleInput.required = true;

  const descriptionLabel = document.createElement('label');
  descriptionLabel.htmlFor = 'todo-description';
  descriptionLabel.textContent = 'Description';
  const descriptionInput = document.createElement('input') as HTMLInputElement;
  descriptionInput.type = 'text';
  descriptionInput.name = 'description';
  descriptionInput.placeholder = 'Description';
  descriptionInput.required = true;


  const submitButton = document.createElement('button') as HTMLButtonElement;
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';

  const container = document.createElement('div');

  container.appendChild(titleLabel);
  container.appendChild(titleInput);
  container.appendChild(descriptionLabel);
  container.appendChild(descriptionInput);
  container.appendChild(submitButton);
  todoForm.appendChild(container);
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

function createRemoveButton(container: HTMLElement, item: TodoItem, project: Project): HTMLButtonElement {
  const button = document.createElement('button') as HTMLButtonElement;
  button.addEventListener('click', () => {
    container.remove();
    removeTodoItem(project, item);
  });
  button.textContent = 'remove';
  return button;
}
