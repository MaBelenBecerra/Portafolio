import ProjectList from "./ProjectList.js"
import APIProject from "./apiProject.js";
import SaveItemList from "./SaveItemsList.js";


const projectList = ProjectList.getInstance();
const saveItemList = SaveItemList.getInstance();

const LocalStorage = {
    saveProjects () {
        localStorage.setItem("projects", JSON.stringify(projectList.allProjects));
    },


    async loadProjects() {

        let projects = JSON.parse(localStorage.getItem("projects"));
        let save = false;

        if(!projects) {
            projects = await APIProject.getProjects();
            save = true;            
        }

        projectList.setProjects(projects);

        if(save) {
            this.saveProjects();
        }
    },

    saveSavedItemList() {
        localStorage.setItem("savedItems", JSON.stringify(SaveItemList.getInstance().projects));
    },


    async loadSavedItemList() {
        let savedItems = JSON.parse(localStorage.getItem("savedItems"));

        if(!savedItems) {
            savedItems = [];
        }

        SaveItemList.getInstance().setProjects(savedItems);
        this.saveSavedItemList();
    }

}

projectList.addObserver(LocalStorage.saveProjects);
saveItemList.addObserver(LocalStorage.saveSavedItemList);

export default LocalStorage;