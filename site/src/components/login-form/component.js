import template from './template.js'
import Manager from '../../manager.js'
import Router from '../../router.js'
import style from './style.js'

class LoginWindow extends HTMLElement {
    constructor() { 
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.subscriptions = [];

        this.username = '';
        this.passwd = ''; 

        this.manager = new Manager();
        this.router = new Router();
    }

    async connectedCallback() {
        this.subscriptions.push(await this.manager.subscribe('login', this.checkState.bind(this)));
        this.render();
    }

    disconnectedCallback() {
        this.username = '';
        this.passwd = '';
        this.unsubscribe();
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(attr, prev, next) {}

    render() {
        this.shadow.innerHTML = template(this) + style();
        this.initEvents();
    }

    initEvents() {
        let loginField = this.shadow.getElementById('login');
        loginField.addEventListener('change', event => {
            this.username = event.target.value;
            this.manager.updateState('username', this.username);
        });
        
        let passwordField = this.shadow.getElementById('password');
        passwordField.addEventListener('change', event => {
            this.passwd = event.target.value;
            this.manager.updateState('passwd', this.passwd);
        });

        let loginBtn = this.shadow.getElementById('login-btn');
        loginBtn.addEventListener('click', () => {
            this.manager.login(this.username, this.passwd);
        });

        let registerBtn = this.shadow.getElementById('register-btn');
        registerBtn.addEventListener('click', () => {
            this.manager.register(this.username, this.passwd);
        });
    }

    checkState(stateName, state) {
        switch(stateName) {
            case 'login':
                if (state.status === 'ok') {
                    this.username = state.username;
                    this.router.showPage('tasks');
                }
                else console.log('Неправильный логин и/или пароль!');
                break;
        }
    }

    unsubscribe() {
        this.subscriptions.forEach(callback => {
            this.manager.unsubscribe(callback);
        });
    }
}

customElements.define('login-window', LoginWindow);
