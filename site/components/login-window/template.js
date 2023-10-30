export default function(vm) {
    return `
    <div class="wrapper">
        <h2>Registration</h2>
        <form action="#">
        <div class="input-box">
            <input id="login" type="text" placeholder="login" value="${vm.username}" required>
        </div>
        <div class="input-box">
            <input id="password" type="password" placeholder="password" required>
        </div>
        <div class="login-box">
            <input id="login-btn" type="button" value="login">
        </div>
        <div class="register-box">
            <input id="register-btn" type="button" value="register">
        </div>
        </form>
    </div>
    `;
}