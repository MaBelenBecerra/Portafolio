import { observerMixin } from "./Mixins.js";


class SaveItemList {

    #projects = [];
    #searchItem = null;
 
    get projects() {
        return this.#projects;
    }


    get searchItem() {
        return this.#searchItem;
    }

    static instance = null;
    static {
        this.instance = new SaveItemList();
    }

    constructor(){
        if(SaveItemList.instance)
            throw new Error("Ya existe una instancia");
    }

    static getInstance() {
        return this.instance;
    }

    find(id) {
        return this.#projects.find(project => project.id == id);
    }

    addProject(project) {

        if(this.find(project.id)) {
            return;
        }

        this.#projects.push(project);

        this.notify();
    }


    remove(project) {
        const id = project.id;
        const array = this.#projects.filter(project => project.id != id);
        this.#projects = array;

        this.notify();
    }

    findByTitle(title) {
        return this.#projects.find(project => project.title.toLowerCase() == title.toLowerCase());
    }


    setSearchItem(item) {
        console.log("Item buscado: ", item);
        this.#searchItem = item;
    }


    setProjects(projects) {
        this.#projects = projects;
    }


}
Object.assign(SaveItemList.prototype, observerMixin);

export default SaveItemList;



