import TodoItem from "./todoItem"
import deleteProject from ".";

export default class Project {
  title: string;
  description: string;
  todoItemList: TodoItem[];

  // Container, title, description, remove button
  domElements: HTMLElement[];

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }

  addTodoItem(item: TodoItem) {
    this.todoItemList.push(item);
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): void {
    this.description = description;
    this.domElements[2].textContent = description;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
    this.domElements[1].textContent = title;
  }

  setProjectElements(elements: HTMLElement[]): void {
    this.domElements = elements;
  }


  addEditListeners(): void {
    this.domElements[1].addEventListener('click', () => {
      this.setTitle(prompt("Enter new name."));
    });

    this.domElements[2].addEventListener('click', () => {
      this.setDescription(prompt("Enter new description."));
    });
  }
}

export function displayProject(container: HTMLElement, project: Project): HTMLElement[] {
  const newProject = document.createElement('div');
  newProject.classList.add('project');

  const projectTitle = document.createElement('h2');
  const projectDescription = document.createElement('p');

  projectTitle.textContent = project.getTitle();
  projectDescription.textContent = project.getDescription();

  const removeButton = createRemovebutton(newProject, project);

  newProject.appendChild(projectTitle);
  newProject.appendChild(projectDescription);
  newProject.appendChild(removeButton);
  container.appendChild(newProject);

  return [newProject, projectTitle, projectDescription, removeButton];
}

function createRemovebutton(newProject: HTMLElement, project: Project): HTMLElement {
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove project';
  removeButton.addEventListener('click', () => {
    removeProject(newProject, project);
  });

  return removeButton;
}

function removeProject(projectDom: HTMLElement, project: Project) {
  projectDom.remove();
  deleteProject(project);
}
