import { projectList } from ".";
import TodoItem from "./todoItem"
import { Priority } from "./todoItem";
import { createAddTodoButton } from "./todoItem";

export default class Project {
  data: {
    title: string;
    description: string;
    todoItemList: TodoItem[];
  }

  dom: {
    container: HTMLElement,
    title: HTMLElement,
    description: HTMLElement,
    addTodoButton: HTMLElement,
    showTodoButton: HTMLElement,
    removeButton: HTMLElement,

  };

  form: {
    todoDialog: HTMLDialogElement,
    todoForm: HTMLFormElement,
    todoTitleInput: HTMLInputElement,
    todoDescriptionInput: HTMLInputElement,
  };

  constructor(title: string, description: string) {
    this.data = {
      title: title,
      description: description,
      todoItemList: [],
    };
  };

  getDescription(): string { return this.data.description; };
  setDescription(description: string): void {
    this.data.description = description;
    this.dom.description.textContent = description;
  };

  getTitle(): string { return this.data.title; };
  setTitle(title: string): void {
    this.data.title = title;
    this.dom.title.textContent = title;
  };

  setDomElements(arr: HTMLElement[]): void {
    this.dom = {
      container: arr[0],
      title: arr[1],
      description: arr[2],
      addTodoButton: arr[3],
      showTodoButton: arr[4],
      removeButton: arr[5],
    };
  };

  setFormElements(arr: HTMLElement[]) {
    this.form = {
      todoDialog: arr[0] as HTMLDialogElement,
      todoForm: arr[1] as HTMLFormElement,
      todoTitleInput: arr[2] as HTMLInputElement,
      todoDescriptionInput: arr[3] as HTMLInputElement,
    };
  };

  addListeners(): void {
    this.dom.title.addEventListener('click', () => {
      this.setTitle(prompt("Enter new name."));
    });

    this.dom.description.addEventListener('click', () => {
      this.setDescription(prompt("Enter new description."));
    });

    this.dom.addTodoButton.addEventListener('click', () => {
      this.form.todoDialog.showModal();
    });

    document.body.appendChild(this.form.todoDialog);

    this.form.todoDialog.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTodoItem(this.form.todoTitleInput.value, this.form.todoDescriptionInput.value);
      this.form.todoDialog.close();
      this.form.todoForm.reset();
      console.log(this.data.todoItemList);
    });
  }

  addTodoItem(title: string, description: string): void {
    this.data.todoItemList.push(new TodoItem(title, description, Priority.high));
  }
}

export function createProject(project: Project): HTMLElement[] {
  const newProject = document.createElement('div');
  newProject.classList.add('project');

  const projectTitle = document.createElement('h2');
  const projectDescription = document.createElement('p');

  projectTitle.textContent = project.getTitle();
  projectDescription.textContent = project.getDescription();

  const removeButton = createRemovebutton(newProject, project);
  const addTodoButton = createAddTodoButton();
  const showTodoButton = createTodoShowButton(project);

  newProject.appendChild(projectTitle);
  newProject.appendChild(projectDescription);
  newProject.appendChild(addTodoButton);
  newProject.appendChild(showTodoButton);
  newProject.appendChild(removeButton);

  return [newProject, projectTitle, projectDescription, addTodoButton, showTodoButton, removeButton];
}

export function showProjects(): void {
  const container = document.getElementById('projects-container');
  container.innerHTML = '';

  for (let i = 0; i < projectList.length; i++)
    container.appendChild(projectList[i].dom.container);
}

function removeProject(projectContainer: HTMLElement, targetProject: Project): void {
  const index = projectList.findIndex((project: Project) => {
    if (projectList.indexOf(project) === projectList.indexOf(targetProject))
      return true;
  });
  projectList.splice(index, index + 1);
  projectContainer.remove();
  showProjects();
}

function createTodoShowButton(project: Project) {
  const todoShowButton = document.createElement('button');
  todoShowButton.textContent = 'Show todo list';

  todoShowButton.addEventListener('click', () => {
    displayTodoItemsList(project);
  });
  return todoShowButton;
}

function createRemovebutton(newProject: HTMLElement, project: Project): HTMLElement {
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove project';
  removeButton.addEventListener('click', () => {
    removeProject(newProject, project);
  });
  return removeButton;
}

export function createTodoDialog(): HTMLElement[] {
  const todoDialog = document.createElement('dialog');
  todoDialog.id = 'todo-dialog';

  const todoForm = document.createElement('form');
  todoForm.id = 'todo-form';

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

  return [todoDialog, todoForm, titleInput, descriptionInput];
}

function displayTodoItemsList(project: Project): void {
  const todoListContainer = document.getElementById('todo-container');
  todoListContainer.innerHTML = '';

  project.data.todoItemList.forEach((item: TodoItem) => {

    const itemContainer = document.createElement('div');

    const title = document.createElement('h2');
    title.textContent = item.title;

    const description = document.createElement('p');
    description.textContent = item.description;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';

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

