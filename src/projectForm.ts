import Project from "./project";
import { displayProject } from "./project";
import { projectList } from ".";

const projectsContainer = document.getElementById('projects-container')
const form = (document.getElementById('project-form') as HTMLFormElement);
const dialog = (document.querySelector('dialog') as HTMLDialogElement);

export default function createProjectButton() {
  document.getElementById('add-project').addEventListener('click', () => {
    dialog.showModal();
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title: string = (document.getElementById('title-input') as HTMLInputElement).value;
  const description: string = (document.getElementById('description-input') as HTMLInputElement).value;

  projectList.push(new Project(title, description));
  projectList[projectList.length - 1].setProjectElements(
    displayProject(projectsContainer, projectList[projectList.length - 1])
  );
  dialog.close();
  form.reset();
});
