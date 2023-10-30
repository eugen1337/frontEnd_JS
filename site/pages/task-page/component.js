import template from './template.js'
import '../../components/task-table/component.js'
import '../../components/page-slider/component.js'
import '../../components/task-status/component.js'

class TaskPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
    }

    connectedCallback() {
        // Rendering
        this.render();
    }

    disconnectedCallback() {}

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(attr, oldValue, newValue) {}

    render() {
        // Filling in shadow root by template
        this.shadow.innerHTML = template(this);
    }
}

customElements.define('task-page', TaskPage);
