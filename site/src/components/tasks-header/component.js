import template from "./template.js";
import style from "./style.js";
import Manager from "../../manager.js";

class TaskTable extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "closed" });
        this.tasks = [];
        this.subscriptions = [];

        this.manager = new Manager();
    }

    async connectedCallback() {
        this.renderHeader();

        this.shadow
            .getElementById("update-btn")
            .addEventListener("click", () => {
                this.manager.query("tasks");
            });

        this.shadow.getElementById("add-btn").addEventListener("click", () => {
            this.createTask();
        });

        this.subscriptions.push(
            await this.manager.subscribe(
                "tasks",
                this.checkState.bind(this)
                // true
            )
        );
        this.subscriptions.push(
            await this.manager.subscribe(
                "calculation",
                this.checkState.bind(this)
            )
        );
    }

    unsubscribe() {
        this.subscriptions.forEach((callback) => {
            this.manager.unsubscribe(callback);
        });
    }

    disconnectedCallback() {
        this.unsubscribe();
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(attr, oldValue, newValue) {}

    renderHeader() {
        this.shadow.innerHTML = template(this) + style();

        let header = document.createElement("tr");
        header.setAttribute("id", "tasks-header");
        const titles = ["id", "a", "b", "result", "status", "actions"];

        titles.map((item) => {
            let td = document.createElement("td");
            td.innerHTML = item;
            header.appendChild(td);
        });
        this.shadow.getElementById("tasks-table").appendChild(header);
    }

    async createTask() {
        let table = this.shadow.getElementById("tasks-table");

        const value1 = this.shadow.getElementById("value1").value;
        const value2 = this.shadow.getElementById("value2").value;

        this.manager.updateState("value1", value1);
        this.manager.updateState("value2", value2);
        await this.manager.query("id");

        const keys = ["id", "value1", "value2", "result", "status"];
        const data = [
            this.manager.getState("id"),
            this.manager.getState("value1"),
            this.manager.getState("value2"),
            "proceed",
            "wait",
        ];
        let tr = document.createElement("tr");

        for (let i in keys) {
            let td = document.createElement("td");
            td.innerHTML = data[i];
            td.setAttribute("id", `${keys[i]}-${data[0]}`);
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    checkState(stateName, state) {
        switch (stateName) {
            case "tasks":
                console.log(state.list);
                this.tasks = state.list;
                this.renderTasks();
                break;
            case "calculation":
                if (state.status === "OK") {
                    const id = this.manager.getState("id");
                    this.changeControlButton(id);
                }
                break;
        }
    }
}

customElements.define("task-table", TaskTable);
