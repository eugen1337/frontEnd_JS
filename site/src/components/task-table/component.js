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

    renderTasks() {
        let table = this.shadow.getElementById("tasks-table");

        Array.from(table.querySelectorAll("tr:not(#tasks-header)")).forEach(
            (row) => {
                row.remove();
            }
        );

        this.tasks.forEach((task) => {
            const id = task["id"];
            const keys = ["id", "value1", "value2", "result", "status"];
            let tr = document.createElement("tr");
            tr.setAttribute("id", `task${task["id"]}`);

            keys.forEach((key) => {
                let td = document.createElement("td");
                td.innerHTML = task[key];
                td.setAttribute("class", `task-${key.toLowerCase()}`);
                td.setAttribute("id", `${key}${task["id"]}`);
                tr.appendChild(td);
            });

            const but = document.createElement("input");
            but.setAttribute("type", "button");
            but.setAttribute("class", "task-action");
            but.setAttribute("value", "delete");

            but.addEventListener("click", async () => {
                let params = {
                    text: task["id"],
                };
                const res = await (
                    await import("../../api.js")
                ).deleteTask(params);
                console.log(res);
                this.shadow.getElementById("task" + task["id"]).innerHTML = "";
            });
            tr.appendChild(but);

            const resBut = document.createElement("input");
            resBut.setAttribute("type", "button");
            resBut.setAttribute("class", "task-action");
            resBut.setAttribute("value", "result");

            const val1 = task["value1"]
            const val2 = task["value2"]

            resBut.addEventListener("click", async () => {
                const calcResult = await (
                    await import("../../api.js")
                ).calc(val1, val2);
                let res = this.shadow.getElementById("result" + id);
                res.innerHTML = calcResult;
                let status = this.shadow.getElementById("status" + id);
                status.innerHTML = "ready";
            });
            tr.appendChild(resBut);

            table.appendChild(tr);
        });

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
