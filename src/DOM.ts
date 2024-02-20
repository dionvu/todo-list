import Project from "./project"
import deleteProject from "."

export default function displayProject(container: HTMLElement, project: Project): HTMLElement[] {
  const newProject = document.createElement('div');
  newProject.classList.add('project');

  const projectTitle = document.createElement('h2');
  const projectDescription = document.createElement('p');

  projectTitle.textContent = project.getTitle();
  projectDescription.textContent = project.getDescription();

  const removeButton = createRemovebutton(newProject, project);

  newProject.appendChild(projectTitle);
  newProject.appendChild(projectDescription);
  newProject.appendChild(removeButton);
  container.appendChild(newProject);

  return [newProject, projectTitle, projectDescription, removeButton];
}

function removeProject(projectDom: HTMLElement, project: Project) {
  projectDom.remove();
  deleteProject(project);
}

function createRemovebutton(newProject: HTMLElement, project: Project) {
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove project';
  removeButton.addEventListener('click', () => {
    removeProject(newProject, project);
  });

  return removeButton;
}
