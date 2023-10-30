import template from './template.js'
import '../../components/login-window/component.js'

class LoginPage extends HTMLElement {
    constructor() { 
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
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
        this.rendered = true;
    }
}

customElements.define('login-page', LoginPage);
