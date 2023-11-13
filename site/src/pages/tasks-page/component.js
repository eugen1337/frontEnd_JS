import template from './template.js'

import '../../components/logout-button/component.js'
import '../../components/task-table/component.js'
import '../../components/task-status/component.js'
// import '../../components/tasks-header/component.js'

class TasksPage extends HTMLElement {
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
    }
}

customElements.define('tasks-page', TasksPage);
