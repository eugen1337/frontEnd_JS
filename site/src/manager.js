export default class StateManager {
    static instance = null;

    constructor() {
        this.noquery = ["username", "password"];
        this.subscribers = {};
        this.states = {
            login: {
                status: "BAD",
            },
            tasks: {},
            calculation: "",
            username: "",
            password: "",
        };
        this.methods = {
            tasks: {
                name: "getTasks",
                params: ["token"],
            },
            login: {
                name: "login",
                params: ["username", "password"],
            },
            register: {
                name: "register",
                params: ["username", "password"],
            },
            calculation: {
                name: "calc",
                params: ["token", "id", "value1", "value2"],
            },
            create: {
                name: "createTask",
                params: ["token", "username", "value1", "value2"],
            },
            delete: {
                name: "deleteTask",
                params: ["token", "id"],
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

        if (!this.subscribers[stateName].includes(callback)) {
            this.subscribers[stateName].push(callback);
        }
        if (emit && !this.noquery.includes(stateName))
            await this.query(stateName);

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

    getState(stateName) {
        switch (stateName) {
            case "token":
                return this.states.login.token;
            case "username":
                return this.states.username;
            case "password":
                return this.states.password;
            case "logged":
                return this.states.login.status !== "BAD";
            case "id":
                return this.states.tasks.id;
            case "value1":
                return this.states.tasks.value1;
            case "value2":
                return this.states.tasks.value2;
            case "tasks":
                return this.states.tasks.list;
            case "calc":
                return this.states.calculation;
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
                this.states.username = newValue;
                emitState = "username";
                break;
            case "password":
                this.states.password = newValue;
                emitState = "password";
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
                this.states.login.token = newValue;
                this.states.login.status = this.states.login.token
                    ? "OK"
                    : "BAD";
                emitState = "login";
                break;
            case "register":
                this.states.login.token = newValue;
                this.states.login.status = this.states.login.token
                    ? "OK"
                    : "BAD";
                emitState = "login";
                break;
            case "tasks":
                if (newValue === "EMPTY") {
                    this.states.tasks.list = "";
                    this.states.tasks.status = "EMPTY";
                } else {
                    this.states.tasks.list = JSON.parse(newValue).docs;
                    this.states.tasks.status = "OK";
                    emitState = "tasks";
                }
                break;
            case "calculation":
                this.states.calculation = newValue;
                emitState = "calculation";
            // this.query('tasks');
            // break;
            case "delete":
                this.query("tasks");
                break;
            case "create":
                this.query("tasks");
                break;
        }

        if (emitState !== "") {
            this.emit(emitState);
        }
    }
}
