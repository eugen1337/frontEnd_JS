export default class StateManager {
    static instance = null;

    constructor() {
        this.subscribers = {};
        this.states = {
            login: {
                status: "BAD",
            },
            tasks: {},
            calculation: {},
            username: "",
            passwd: "",
        };
        this.methods = {
            tasks: {
                name: "getTasks",
                params: ["username"],
            },
            login: {
                name: "login",
                params: ["username", "password"],
            },
            calculation: {
                name: "startCalculation",
                params: ["logged", "username", "id"],
            },
            id: {
                name: "createTask",
                params: ["username", "value1", "value2"],
            },
            delete: {
                name: "deleteTask",
                params: ["logged", "username", "id"],
            },
        };

        if (!StateManager.instance) StateManager.instance = this;
        else return StateManager.instance;
    }

    emit(stateName) {
        const state = this.states[stateName];
        if (this.subscribers[stateName]) {
            this.subscribers[stateName].forEach((callback) =>
                callback(stateName, state)
            );
        }
    }

    async subscribe(stateName, callback, emit = false) {
        if (!this.subscribers[stateName]) this.subscribers[stateName] = [];

        this.subscribers[stateName].push(callback);
        if (emit) await this.query(stateName);

        return callback;
    }

    unsubscribe(callback) {
        for (let key in this.subscribers) {
            const idx = this.subscribers[key].indexOf(callback);
            if (idx !== -1) {
                this.subscribers[key].splice(idx, 1);
                return true;
            }
        }

        return false;
    }

    async query(queryType) {
        const methodName = this.methods[queryType].name;
        const paramNames = this.methods[queryType].params;
        const params = this.getStates(paramNames);
        const queryResult = await (
            await import("./api.js")
        )[methodName](params);
        console.log(queryResult);
        this.updateState(queryType, queryResult);
    }

    async login(username, password) {
        const queryResult = await (
            await import("./api.js")
        ).login(username, password);
        this.updateState("login", queryResult);
    }

    async register(username, password) {
        const queryResult = await (
            await import("./api.js")
        ).register(username, password);
        this.updateState("login", queryResult);
    }

    getState(stateName) {
        switch (stateName) {
            case "username":
                return this.states.login.username;
            case "passwd":
                return this.states.login.passwd;
            case "id":
                console.log(this.states.tasks.id);
                return this.states.tasks.id;
            case "value1":
                return this.states.tasks.value1;
            case "value2":
                return this.states.tasks.value2;
        }
    }

    getStates(stateNames) {
        let states = {};
        stateNames.forEach((stateName) => {
            states[stateName] = this.getState(stateName);
        });
        return states;
    }

    updateState(stateName, newValue) {
        let emitState = "";
        switch (stateName) {
            case "username":
                this.states.login.username = newValue;
                break;
            case "passwd":
                this.states.login.passwd = newValue;
                break;
            case "id":
                this.states.tasks.id = newValue;
                break;
            case "value1":
                this.states.tasks.value1 = newValue;
                break;
            case "value2":
                this.states.tasks.value2 = newValue;
                break;
            case "login":
                this.states.login.status = newValue;
                emitState = "login";
                break;
            case "tasks":
                this.states.tasks.list = JSON.parse(newValue).docs;
                this.states.tasks.status = this.states.tasks.list.length
                    ? "OK"
                    : "EMPTY";
                emitState = "tasks";
                break;
            case "calculation":
                this.states.calculation.status = newValue;
                emitState = "calculation";
                this.query("tasks");
                break;
            case "delete":
                this.query("tasks");
                break;
            case "create":
                this.query("tasks");
                break;
        }

        if (emitState !== "") this.emit(emitState);
    }
}
