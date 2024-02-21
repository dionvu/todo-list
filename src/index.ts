import '../style/style.css';
import Project from './project';
import createProjectButton from './projectForm';

// const projectsContainer = document.getElementById('projects-container');

export let projectList: Project[] = [];

// function logProjects(projectList: Project[]): void {
//   console.table(projectList);
//   console.log('table');
// }

createProjectButton();
