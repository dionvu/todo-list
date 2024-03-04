import Project from './project';
import '../style/style.css';
import { createProject } from "./project";
import { createTodoDialog } from "./todoItem";
import { showProjects } from "./project";

export let projectList: Project[] = [];

createProjectButton();


const form = (document.getElementById('project-form') as HTMLFormElement);
const dialog = (document.getElementById('project-dialog') as HTMLDialogElement);

function createProjectButton() {
  document.getElementById('add-project').addEventListener('click', () => {
    dialog.showModal();
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title: string = (document.getElementById('project-title') as HTMLInputElement).value;
  const description: string = (document.getElementById('project-description') as HTMLInputElement).value;

  projectList.push(new Project(title, description));

  projectList[projectList.length - 1].setDomElements(createProject(projectList[projectList.length - 1]));

  projectList[projectList.length - 1].setFormElements(createTodoDialog());

  projectList[projectList.length - 1].addListeners();

  showProjects();
  dialog.close();
  form.reset();
});
