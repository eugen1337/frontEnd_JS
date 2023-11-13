export default class Router {
    static instance = null;

    constructor() {
        this.routes = {};
        
        if (!Router.instance) Router.instance = this;
        else return Router.instance;
    }

    addPage(url, element) {
        this.routes[url] = element
    }

    setStartPage(element) {
        this.routes.start = element;
    }

    async showPage(url) {
        document.body.innerHTML = '';
        document.body.appendChild(this.routes[url]);
    }
}
