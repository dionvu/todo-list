import TodoItem from "./todoItem"

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

  getTitle(): string {
    return this.title;
  }

  setProjectElements(elements: HTMLElement[]): void {
    this.domElements = elements;
  }

  setTitle(title: string): void {
    this.title = title;
    this.domElements[1].textContent = title;
  }
}
