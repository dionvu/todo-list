import Project from "./project";
import { createProject } from "./project";
import { projectList } from ".";
import { createTodoDialog } from "./todoItem";
import { showProjects } from "./project";

const form = (document.getElementById('project-form') as HTMLFormElement);
const dialog = (document.getElementById('project-dialog') as HTMLDialogElement);

export default function createProjectButton() {
  document.getElementById('add-project').addEventListener('click', () => {
    dialog.showModal();
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title: string = (document.getElementById('project-title') as HTMLInputElement).value;
  const description: string = (document.getElementById('project-description') as HTMLInputElement).value;

  addProject(title, description);

  showProjects();
  dialog.close();
  form.reset();
});

export function addProject(title: string, description: string) {
  projectList.push(new Project(title, description));
  projectList[projectList.length - 1].setDomElements(createProject(projectList[projectList.length - 1]));
  projectList[projectList.length - 1].setFormElements(createTodoDialog());
  projectList[projectList.length - 1].addListeners();
}
