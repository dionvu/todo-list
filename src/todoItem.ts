export enum Priority {
  high,
  medium,
  low,
}

export default class todoItem {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;

  constructor(title: string, description: string, dueDate: string, priority: Priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}