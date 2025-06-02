
import BaseHTMLElement from "../base/BaseHTMLElement.js";
import SaveItemList from "../../services/SaveItemsList.js";


export default class SavePage extends BaseHTMLElement {

    constructor() {
        super();

        this.firstRender = true;
    }



    async connectedCallback() {
       
        this.render();

        this.addEventListener("search", (event) => {
            this.firstRender = false;
            this.render();  
        });
        
    }



    async render() {
        this.shadowRoot.innerHTML = "";
        const template = document.getElementById("save-page-id");
        const element = template.content.cloneNode(true).firstElementChild;
        await this.loadCSS("/blocks/savePage/SavePage.css");


        let cardContainerTitle = element.querySelector(".save-page__card-title-search")
        cardContainerTitle.hidden = this.firstRender;

        const saveList = SaveItemList.getInstance();

        let templateSave = document.getElementById('project-save-card-template');
        let cardSave = templateSave.content.cloneNode(true).firstElementChild;

        if(saveList.searchItem) {
            let imgSave = cardSave.querySelector(".projects-save__card-image");
            let titleSave = cardSave.querySelector(".projects-save__card-title");
            let paragraphSave = cardSave.querySelector(".projects-save__card-paragraph");
            let linkSave = cardSave.querySelector(".projects-save__card-button");

            const saveItem = saveList.searchItem;

            const saveContainer = element.querySelector(".save-page__card-item");

            imgSave.src = saveItem.imageURL;
            titleSave.textContent = saveItem.title;
            paragraphSave.textContent = saveItem.content;
            linkSave.href = saveItem.githubURL;

            saveContainer.appendChild(cardSave);

            cardSave.addEventListener("click", () => {
                app.router.go(`/projects/${saveItem.id}`, true);
            });

        }
        else {
            let cardContainerTitle = element.querySelector(".save-page__card-title-search")
            cardContainerTitle.textContent = "No hay resultados para tu búsqueda";
        }
 
        const fragment = new DocumentFragment();

        for(let saveItem of saveList.projects) {
            let template = document.getElementById('project-save-card-template');
            let card = template.content.cloneNode(true).firstElementChild;
          
            let img = card.querySelector(".projects-save__card-image");
            let title = card.querySelector(".projects-save__card-title");
            let paragraph = card.querySelector(".projects-save__card-paragraph");
            let link = card.querySelector(".projects-save__card-button");

            img.src = saveItem.imageURL;
            title.textContent = saveItem.title;
            paragraph.textContent = saveItem.content;
            link.href = saveItem.githubURL;
            card.dataset.id = saveItem.id;


            card.addEventListener("click", () => {
                app.router.go(`/projects/${saveItem.id}`, true);
            });

            fragment.appendChild(card);
        }

        const container = element.querySelector(".save-page__cards");
        container.appendChild(fragment);



        this.shadowRoot.appendChild(element);
    }
}

customElements.define("save-page", SavePage);