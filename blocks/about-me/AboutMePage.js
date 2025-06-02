import BaseHTMLElement from "../base/BaseHTMLElement.js";
import Markdown from "../../services/Markdown.js";

export default class AboutMePage extends BaseHTMLElement {
    constructor() {
        super();
    }

    async connectedCallback(){
        const aboutMe = document.getElementById('about-me-template').content.cloneNode(true).firstElementChild;
        const profile = document.getElementById('profile-template').content.cloneNode(true).firstElementChild;

        const paragraph = aboutMe.querySelector(".about-me__paragraph");
        const preview  = aboutMe.querySelector(".about-me__paragraph-view");

       
       
        preview.addEventListener("click", (event) => {
            paragraph.classList.remove("about-me__paragraph--hidden");
            preview.classList.add("about-me__paragraph--hidden");
        })

        paragraph.addEventListener("blur", (event) => {
            paragraph.classList.add("about-me__paragraph--hidden");
            preview.classList.remove("about-me__paragraph--hidden");
        })


        

        const mutationObserver = new MutationObserver((entries) => {

            const target = paragraph.innerText;
            const data = target;
            const lines = data.split("\n").filter(line => line != "");
    
            for(let i = 0; i < lines.length; i++){
                const words = lines[i].split(" ");

                if(words.length == 0)
                    continue;

                const tag = Markdown[words[0]];
                
                if(!tag)
                    continue;

                let newLine;

                const newLineContent = words.slice(1).join(" ");
                
                if(tag == "ul") {
                    newLine = `<${tag}><li class="about-me__list-style--inside">${newLineContent}</li></${tag}>`
                }
                else {
                    newLine = `<${tag}>${newLineContent}</${tag}>`;
                }
               
                lines[i] = newLine;
            }

            
            if(lines.length === 0){
                preview.innerHTML = "Add some text to my description here.";
            }
            else {
                preview.innerHTML = lines.join("\n");
            }
            
        })

        mutationObserver.observe(paragraph, {
            characterData: true,
            subtree: true,
            characterDataOldValue: true
        });

        const fragment = new DocumentFragment();
        
        fragment.appendChild(aboutMe);
        fragment.appendChild(profile);

        this.shadowRoot.appendChild(fragment);
        await this.loadCSS("/blocks/about-me/about-me.css");
    }
}


customElements.define("about-me-page", AboutMePage);