import '../style/style.css';
import Project from './project';
import createProjectButton from './projectForm';
// import todoItem from './todoItem';
// import { Priority } from './todoItem';

// const projectsContainer = document.getElementById('projects-container');

export let projectList: Project[] = [];

// projectList[0] = new Project("Title", "Description");
//
// projectList[0].todoItemList.push(new todoItem("other", "other", "1/2/32", Priority.high));

// function logProjects(projectList: Project[]): void {
//   console.table(projectList);
//   console.log('table');
// }

createProjectButton();
