export default class BaseHTMLElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
    }

    async loadCSS(path) {
        const style = document.createElement("style");
        const response = await fetch(path);

        if(!response.ok)
            throw new Error("Error al obtener la pagina del css");

        const css = await response.text();
        style.textContent = css;
        this.shadowRoot.appendChild(style);        
    }
}