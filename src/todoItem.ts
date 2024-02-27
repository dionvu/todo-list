export enum Priority {
  high = 'high',
  medium = 'medium',
  low = 'low',
}

export default class todoItem {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  domElements: HTMLElement[];

  constructor(title: string, description: string, dueDate: string, priority: Priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  setTodoElements(elements: HTMLElement[]): void { this.domElements = elements; };
}

export function createAddTodoButton(): HTMLElement {
  const addTodoButton = document.createElement('button');
  addTodoButton.textContent = 'Add';
  return addTodoButton;
}

export function addTodoItem(todoItemList: todoItem[], title: string, description: string): void {
  todoItemList.push(new todoItem(title, description, "1/2/2", Priority.high));
}
