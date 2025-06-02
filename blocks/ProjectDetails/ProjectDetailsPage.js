import BaseHTMLElement from "../base/BaseHTMLElement.js";
import ProjectList from "../../services/ProjectList.js";
import { COMMANDS } from "../../services/SaveCommand.js";
import { CommandExecutor } from "../../services/SaveCommand.js";
import { Commnad } from "../../services/SaveCommand.js";

export default class ProjectDetailPage extends BaseHTMLElement {

    constructor() {
        super();
        this.toggle = this.toggleSave.bind(this);
    }


    toggleSave(event) {
        if(event.ctrlKey && event.key === "f") {
            event.preventDefault();
            const projectId = this.dataset.projectId;
            const project = ProjectList.getInstance().find(projectId);
            const command = new Commnad(COMMANDS.SAVE, project);
            CommandExecutor.execute(command);
            
            alert("Proyecto guardado en favoritos");
            ProjectList.getInstance().saveProject(projectId);
        }
    }

    async connectedCallback() {
        const template = document.getElementById("project-details-id");
        const blockElement = template.content.cloneNode(true).firstElementChild;
        await this.loadCSS("/blocks/ProjectDetails/ProjectDetailsPage.css");

        const project = ProjectList.getInstance().find(this.dataset.projectId);

        const projectTitle = blockElement.querySelector(".project-details-page__name");
        const projectDescription = blockElement.querySelector(".project-details-page__description");

        projectTitle.textContent = project.title;
        projectDescription.textContent = project.content;

        document.addEventListener("keydown", this.toggle);

        this.shadowRoot.appendChild(blockElement);
    }


    disconnectedCallback() {
        document.removeEventListener("keydown", this.toggle);
    }

}



customElements.define("project-details-page", ProjectDetailPage);

