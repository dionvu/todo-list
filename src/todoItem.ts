enum Priority {
  "high",
  "medium",
  "low"
}

class todoItem {
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;

  constructor(title: string, description: string, dueDate: Date, priority: Priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export default todoItem;
