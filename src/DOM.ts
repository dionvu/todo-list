import Project from "./project"
import deleteProject from ".";

export default function displayProject(container: HTMLElement, project: Project) {
  const newProject = document.createElement('div');
  newProject.classList.add('project');

  const projectTitle = document.createElement('h2');
  const projectDescription = document.createElement('p');

  projectTitle.textContent = project.getTitle();
  projectDescription.textContent = project.getDescription();

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove project';
  removeButton.addEventListener('click', () => {
    removeProject(newProject, project);

  });

  newProject.appendChild(projectTitle);
  newProject.appendChild(projectDescription);
  newProject.appendChild(removeButton);
  container.appendChild(newProject);
}

function removeProject(projectDom: HTMLElement, project: Project) {
  projectDom.remove();
  deleteProject(project);
}
