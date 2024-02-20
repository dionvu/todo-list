import '../style/style.css';
import Project from './project';
// import TodoItem from './todoItem';
// import { Priority } from './todoItem';
import displayProject from './DOM';

let projectList: Project[] = [];

projectList.push(new Project("Title", "Describing words"));

displayProject(document.getElementById('projects-container'), projectList[0]);

log();

export default function deleteProject(targetProject: Project) {
  const index = projectList.findIndex((project: Project) => {
    if (project.title === targetProject.title) return true;
  });
  projectList.splice(index, index + 1);

  log();
};

function log() {
  projectList.forEach((element) => { console.log(element.title) });
  console.log("done");
}
