import { projectList } from ".";
// import TodoItem from "./todoItem"

export default class Project {
  title: string;
  description: string;
  // todoItemList: TodoItem[];

  // Container, title, description, remove button
  domElements: HTMLElement[];

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }

  // addTodoItem(item: TodoItem) { this.todoItemList.push(item); };

  getDescription(): string { return this.description; };
  setDescription(description: string): void {
    this.description = description;
    this.domElements[2].textContent = description;
  };

  getTitle(): string { return this.title; };
  setTitle(title: string): void {
    this.title = title;
    this.domElements[1].textContent = title;
  };

  setProjectElements(elements: HTMLElement[]): void { this.domElements = elements; };

  /**
   * @brief Allows user to edit the project title & description by clicking on them.
   */
  addEditListeners(): void {
    this.domElements[1].addEventListener('click', () => {
      this.setTitle(prompt("Enter new name."));
    });

    this.domElements[2].addEventListener('click', () => {
      this.setDescription(prompt("Enter new description."));
    });
  }
}

/**
 * @brief Displays the project in the dom.
 *
 * @param container The project container. 
 * @param project The project object to be displayed
 * 
 * @return Array containing the created dom elements.
 */
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

/**
 * @brief Removes a Project from the main list of projects.
 * @param projectDom The dom container of the project.
 * @param targetProject The project to be removed.
 */
function removeProject(projectDom: HTMLElement, targetProject: Project): void {
  const index = projectList.findIndex((project: Project) => {
    if (project.title === targetProject.title
      && project.description === targetProject.description)
      return true;
  });
  projectList.splice(index, index + 1);
  projectDom.remove();
}

/**
 * @brief Helper function for displayProject that creates the remove button on each project,
 * and adds a listener that calls deleteProject.
 * @param targetProject The project to be removed.
 * @return The dom elemnt of the button.
 */
function createRemovebutton(newProject: HTMLElement, project: Project): HTMLElement {
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove project';
  removeButton.addEventListener('click', () => {
    removeProject(newProject, project);
  });
  return removeButton;
}
