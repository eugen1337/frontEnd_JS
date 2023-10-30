import './pages/login-page/component.js'
// import './task-page/component.js'

export default class Router {
    static instance = null;

    constructor() {
        this.routes = {};
        this.routes.default = document.createElement("login-page");

        if (!Router.instance) Router.instance = this;
        else return Router.instance;
    }

    addPage(url, pageName) {
        this.routes[url] = document.createElement(pageName);
    }

    async showPage(url='default') {
        if (!Object.keys(this.routes).includes(url)) url = 'default';

        document.body.innerHTML = '';
        document.body.appendChild(this.routes[url]);
    }
}
