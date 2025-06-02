import BaseHTMLElement from "../base/BaseHTMLElement.js";
import ProjectList from "../../services/ProjectList.js";


export default class ProjectPage extends BaseHTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {
        const blockElement = document.getElementById('projects-template').content.cloneNode(true).firstElementChild;
        this.shadowRoot.appendChild(blockElement);
        await this.loadCSS("/blocks/projects/projects.css");

        this.render();
    }

    render() {

        const projectCards = this.shadowRoot.querySelector('.projects__cards');
        const seeMoreButton = this.shadowRoot.querySelector('.projects__button')
        projectCards.innerHTML = "";

        const fragment = new DocumentFragment();

        for(let project of ProjectList.getInstance().projects) {
            let template = document.getElementById('project-card-template');
            let card = template.content.cloneNode(true).firstElementChild;
            card.id = `project-id-${project.id}`;
            
            let img = card.querySelector(".projects__card-image");
            let title = card.querySelector(".projects__card-title");
            let paragraph = card.querySelector(".projects__card-paragraph");
            let link = card.querySelector(".projects__card-button");
            let likesCounter = card.querySelector(".projects__card-heart-content");
            let saveIcon = card.querySelector(".projects__save-icon");
            let heartIcon = card.querySelector(".projects__heart-icon")

            img.src = project.imageURL;
            title.textContent = project.title;
            paragraph.textContent = project.content;
            link.href = project.githubURL;
            likesCounter.textContent = project.likes;

            if(project.save == "true")
                saveIcon.classList.add("projects__save-icon--save")

            if(project.like == "true")
                heartIcon.classList.add("projects__heart-icon--liked")


            card.addEventListener("click", (event) => {
             
                if( event.target.tagName == "svg" ||event.target.tagName == "path" || event.target.tagName == "g" 
                    || event.target.classList.contains("projects__card-heart-content") 
                    || event.target.classList.contains("projects__heart-icon") 
                    || event.target.classList.contains("projects__card-heart")
                    || event.target.classList.contains("projects__card-save")
                    || event.target.classList.contains("projects__card-button")
                    || event.target.classList.contains("nav__icon")) {
                    return;
                }

                app.router.go(`/projects/${project.id}`, true);
            });


            this.addListeners(heartIcon, saveIcon);

            fragment.appendChild(card);
        }

        if(!ProjectList.getInstance().limitedView)
            seeMoreButton.hidden = true;

        seeMoreButton.addEventListener("click", () => {
            ProjectList.getInstance().seeMore();
            this.render();
        });

        projectCards.appendChild(fragment);
    }


    addListeners(heartIcon, saveIcon){
        saveIcon.parentElement.addEventListener("click", () => {
            const cardId = saveIcon.parentElement.parentElement.id.split('-')[2];
            
            if(ProjectList.getInstance().find(cardId).save == "true")
                ProjectList.getInstance().unsaveProject(cardId);
            else {
                ProjectList.getInstance().saveProject(cardId);
            }

            this.render();
        });

        heartIcon.parentElement.addEventListener("click", () => {
            const cardId = heartIcon.parentElement.parentElement.id.split('-')[2];
            if(ProjectList.getInstance().find(cardId).like == "false") {
                ProjectList.getInstance().addLike(cardId);
            }
            else {
                ProjectList.getInstance().removeLike(cardId);
            }
            
            this.render();
        });

            
    }
}



customElements.define("project-page", ProjectPage);