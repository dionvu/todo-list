import TodoItem from "./todoItem"

class Project {
  title: string;
  description: string;
  todoItemList: TodoItem[];

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}

export default Project;
