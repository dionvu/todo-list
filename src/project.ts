import { projectList } from ".";
import { Priority } from "./todoItem";
import { displayTodoItemsList } from "./todoItem";
import TodoItem from "./todoItem"

export default class Project {

  todoItemList: TodoItem[];
  data: {
    title: string;
    description: string;
  }

  dom: {
    container: HTMLElement,
    title: HTMLElement,
    description: HTMLElement,
    addTodoButton: HTMLButtonElement,
    showTodoButton: HTMLButtonElement,
    removeButton: HTMLButtonElement,
  };

  todoForm: {
    dialog: HTMLDialogElement,
    form: HTMLFormElement,
    titleInput: HTMLInputElement,
    descriptionInput: HTMLInputElement,
    submit: HTMLElement,
  };

  constructor(title: string, description: string) {
    this.data = {
      title: title,
      description: description,
    };
    this.todoItemList = [];
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

  setDomElements(obj: {
    container: HTMLElement, title: HTMLElement,
    description: HTMLElement, add: HTMLButtonElement,
    show: HTMLButtonElement, remove: HTMLButtonElement
  }): void {
    this.dom = {
      container: obj.container,
      title: obj.title,
      description: obj.description,
      addTodoButton: obj.add,
      showTodoButton: obj.show,
      removeButton: obj.remove,
    };
  }

  setFormElements(obj: {
    dialog: HTMLDialogElement, todoForm: HTMLFormElement,
    titleInput: HTMLInputElement, descriptionInput: HTMLInputElement
    submit: HTMLElement,
  }): void {
    this.todoForm = {
      dialog: obj.dialog,
      form: obj.todoForm,
      titleInput: obj.titleInput,
      descriptionInput: obj.descriptionInput,
      submit: obj.submit,
    };
  }

  addListeners(): void {
    this.dom.title.addEventListener('click', () => {
      this.setTitle(prompt("Enter new name."));
    });

    this.dom.description.addEventListener('click', () => {
      this.setDescription(prompt("Enter new description."));
    });

    this.dom.addTodoButton.addEventListener('click', () => {
      this.todoForm.dialog.showModal();
    });

    document.body.appendChild(this.todoForm.dialog);

    this.todoForm.dialog.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTodoItem(this.todoForm.titleInput.value, this.todoForm.descriptionInput.value);
      console.table(this.todoItemList);
      this.todoForm.dialog.close();
      this.todoForm.form.reset();
      displayTodoItemsList(this);
    });
  }

  addTodoItem(title: string, description: string): void {
    this.todoItemList.push(new TodoItem(title, description, Priority.low));
  }
}

export function removeTodoItem(project: Project, targetItem: TodoItem) {
  const index = project.todoItemList.findIndex((element: TodoItem) => {
    if (project.todoItemList.indexOf(element) === project.todoItemList.indexOf(targetItem)) return true;
  });
  project.todoItemList.splice(index, 1);
  console.table(project.todoItemList);
}


export function createProject(project: Project): {
  container: HTMLElement, title: HTMLElement,
  description: HTMLElement, add: HTMLButtonElement,
  show: HTMLButtonElement, remove: HTMLButtonElement
} {
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

  const buttonContainer = document.createElement('div');
  buttonContainer.appendChild(addTodoButton);
  buttonContainer.appendChild(showTodoButton);
  buttonContainer.appendChild(removeButton);
  newProject.appendChild(buttonContainer);

  let obj = {
    container: newProject,
    title: projectTitle,
    description: projectDescription,
    add: addTodoButton,
    show: showTodoButton,
    remove: removeButton,
  };
  return obj;
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
  projectList.splice(index, 1);
  console.table(projectList);
  projectContainer.remove();
  showProjects();
}

function createTodoShowButton(project: Project): HTMLButtonElement {
  const todoShowButton = document.createElement('button') as HTMLButtonElement;
  todoShowButton.textContent = 'Show Todo';

  todoShowButton.addEventListener('click', () => {
    displayTodoItemsList(project);
  });
  return todoShowButton;
}

function createRemovebutton(newProject: HTMLElement, project: Project): HTMLButtonElement {
  const removeButton = document.createElement('button') as HTMLButtonElement;
  removeButton.textContent = 'Remove project';
  removeButton.addEventListener('click', () => {
    removeProject(newProject, project);
  });
  return removeButton;
}

function createAddTodoButton(): HTMLButtonElement {
  const addTodoButton = document.createElement('button') as HTMLButtonElement;
  addTodoButton.textContent = 'Add';
  return addTodoButton;
}
