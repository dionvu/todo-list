import { projectList } from ".";
import todoItem, { Priority } from "./todoItem";
import TodoItem from "./todoItem"

export default class Project {
  title: string;
  description: string;
  todoItemList: TodoItem[];

  // Container, title, description, add todo, show todo, remove button
  domElements: HTMLElement[];

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.todoItemList = [];
  }

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

    const dialogTodo = document.getElementById('todo-dialog') as HTMLDialogElement;

    this.domElements[3].addEventListener('click', () => {
      dialogTodo.showModal();
    });

    const formTodo = document.getElementById('todo-form') as HTMLFormElement;

    formTodo.addEventListener('submit', (e) => {
      e.preventDefault();
      const title: string = (document.getElementById('todo-title') as HTMLInputElement).value;
      const description: string = (document.getElementById('todo-description') as HTMLInputElement).value;
      addTodoItem(this.todoItemList, title, description);
      dialogTodo.close();
      formTodo.reset();
      displayTodoItemsList(this);
    });
  }
}

/**
 * @brief Displays the project in the dom.
 * @param container The project container. 
 * @param project The project object to be displayed
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

  const addTodoButton = createAddTodoButton();

  const showTodoButton = createTodoShowButton(project);

  newProject.appendChild(projectTitle);
  newProject.appendChild(projectDescription);
  newProject.appendChild(addTodoButton);
  newProject.appendChild(showTodoButton);
  newProject.appendChild(removeButton);
  container.appendChild(newProject);

  return [newProject, projectTitle, projectDescription, addTodoButton, showTodoButton, removeButton];
}

/**
 * @brief Removes a Project from the main list of projects.
 * @param projectDom The dom container of the project.
 * @param targetProject The project to be removed.
 */
function removeProject(projectDom: HTMLElement, targetProject: Project): void {
  const index = projectList.findIndex((project: Project) => {
    if (projectList.indexOf(project) === projectList.indexOf(targetProject))
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

function createTodoShowButton(project: Project) {
  const todoShowButton = document.createElement('button');
  todoShowButton.textContent = 'Show todo list';

  todoShowButton.addEventListener('click', () => {
    displayTodoItemsList(project);
  });
  return todoShowButton;
}

function displayTodoItemsList(project: Project): void {
  const todoListContainer = document.getElementById('todo-container');
  todoListContainer.innerHTML = '';

  project.todoItemList.forEach((item: todoItem) => {

    const itemContainer = document.createElement('div');

    const projectName = document.createElement('h2');
    projectName.textContent = item.title;

    const date = document.createElement('h3');
    date.textContent = `Due date: ${item.dueDate}`;

    const projectDescription = document.createElement('p');
    projectDescription.textContent = item.description;

    const priority = document.createElement('h3');
    if (item.priority === Priority.high) priority.textContent = `Priority: ${Priority.high}`;

    projectName.addEventListener('click', () => {
      const newName: string = prompt('Enter new name');
      projectName.textContent = newName;
      item.title = newName;
    });

    // projectDescription.addEventListener('click', () => {
    //   const newDescription: string = prompt('Enter new name');
    //   projectDescription.textContent = newDescription;
    //   item.title = newDescription;
    // });
    //
    // date.addEventListener('click', () => {
    //   const newDate: string = prompt('Enter new name');
    //   date.textContent = newDate;
    //   item.title = newDate;
    // });

    // priority.addEventListener('click', () => {
    //   if (item.priority === Priority.high)
    //     item.priority = Priority.low;
    //   else if (item.priority === Priority.medium)
    //     item.priority = Priority.high;
    //   else
    //     item.priority = Priority.medium;
    //   displayTodoItemsList(project);
    // });

    itemContainer.appendChild(projectName);
    itemContainer.appendChild(date);
    itemContainer.appendChild(priority);
    itemContainer.appendChild(projectDescription);
    todoListContainer.appendChild(itemContainer);
  });
}

export function createAddTodoButton(): HTMLElement {
  const addTodoButton = document.createElement('button');
  addTodoButton.textContent = 'Add';
  return addTodoButton;
}

function addTodoItem(todoItemList: todoItem[], title: string, description: string): void {
  todoItemList.push(new todoItem(title, description, "1/2/2", Priority.high));
}
