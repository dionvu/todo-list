import '../style/style.css';
import Project from './project';
import createProjectButton from './projectForm';
import { displayProject } from './project';

const projectsContainer = document.getElementById('projects-container')

export let projectList: Project[] = [];

projectList.push(new Project("Title", "Describing words"));

projectList[0].setProjectElements(
  displayProject(projectsContainer, projectList[0])
);

projectList[0].addEditListeners();

logProjects(projectList);

export default function deleteProject(targetProject: Project) {
  const index = projectList.findIndex((project: Project) => {
    if (project.title === targetProject.title
      && project.description === targetProject.description)
      return true;
  });
  projectList.splice(index, index + 1);

  logProjects(projectList);
};

function logProjects(projectList: Project[]): void {
  console.table(projectList);
  console.log('table');
}

createProjectButton();
