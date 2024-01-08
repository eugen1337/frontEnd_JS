import Router from "./router.js";
import "./pages/login-page/component.js";
import "./pages/tasks-page/component.js";

(async () => {
    const router = new Router();

    router.setStartPage(document.createElement("login-page"));

    router.addPage("login", document.createElement("login-page"));
    router.addPage("tasks", document.createElement("tasks-page"));

    await router.showPage("start");
})();
