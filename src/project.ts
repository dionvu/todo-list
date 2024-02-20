import TodoItem from "./todoItem"

export default class Project {
  title: string;
  description: string;
  todoItemList: TodoItem[];

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
}
