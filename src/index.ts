import '../style/style.css';
import Project from './project';
import displayProject from './DOM';

let projectList: Project[] = [];

projectList.push(new Project("Title", "Describing words"));
projectList.push(new Project("zz", "Describing wordz"));

// Test
projectList[0].setProjectElements(
  displayProject(document.getElementById('projects-container'), projectList[0])
);

// projectList[1].setProjectElements(
//   displayProject(document.getElementById('projects-container'), projectList[1])
// );
//
// projectList[0].setTitle('New title!');
// end 

logProjects(projectList);

export default function deleteProject(targetProject: Project) {
  const index = projectList.findIndex((project: Project) => {
    if (project.title === targetProject.title) return true;
  });
  projectList.splice(index, index + 1);

  logProjects(projectList);
};

function logProjects(projectList: Project[]): void {
  console.table(projectList);
  console.log('table');
}
