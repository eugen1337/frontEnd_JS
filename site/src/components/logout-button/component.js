import template from './template.js'
import Manager from '../../manager.js'
import Router from '../../router.js'

class PageSlider extends HTMLElement {
    constructor() { 
        super();
        this.shadow = this.attachShadow({mode: 'closed'});

        this.manager = new Manager();
        this.router = new Router();

        this.username = this.manager.getState('username');
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {}

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(attr, oldValue, newValue) {}

    render() {
        this.shadow.innerHTML = template(this);

        this.shadow.getElementById("back-but").addEventListener('click', () => {
            this.manager.updateState('username', '');
            this.manager.updateState('passwd', '');
            this.router.showPage('login');
        });
    }
}

customElements.define('logout-button', PageSlider);
