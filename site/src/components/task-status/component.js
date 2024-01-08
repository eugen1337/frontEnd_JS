import template from './template.js'
import style from './style.js'
import Manager from "../../manager.js";

class TaskStatus extends HTMLElement {
    constructor() { 
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.status = {};
        this.statusStr = ''
        this.tasks = [];
        this.subscriptions = [];

        this.manager = new Manager();
    }

    async connectedCallback() {
        this.render();
        this.subscriptions.push(await this.manager.subscribe('tasks', this.checkState.bind(this), true));
    }

    disconnectedCallback() {
        this.unsubscribe();
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(attr, oldValue, newValue) {}

    render() {
        this.shadow.innerHTML = template(this) + style();
    }

    checkState(stateName, state) {
        switch(stateName) {
            case 'tasks':
                case 'tasks':
                    this.tasks = state.list;
                    this.updateTasks();
                break;
        }
    }

    updateTasks() {
        this.status = {
            count: this.tasks.length,
            waiting: 0,
            processing: 0,
            processed: 0
        };

        this.tasks.forEach(task => {
            const stat = task.status.toLowerCase();
            this.status[stat]++;
        });

        this.render();
    }

    unsubscribe() {
        this.subscriptions.forEach(callback => {
            this.manager.unsubscribe(callback);
        });
    }
}

customElements.define('task-status', TaskStatus);
