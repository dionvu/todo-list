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

export function createAddTodoButton(): HTMLElement {
  const addTodoButton = document.createElement('button');
  addTodoButton.textContent = 'Add';
  return addTodoButton;
}

export function addTodoItem(todoItemList: todoItem[], title: string, description: string): void {
  todoItemList.push(new todoItem(title, description, Priority.high));
}
