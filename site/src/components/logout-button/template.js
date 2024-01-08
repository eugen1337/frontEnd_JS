export default function(vm) {
    return `
    <div>
    <span>user ${vm.username}</span>
    <input id="back-but" type="button" value="Выйти">
    </div>
    <style>
        div {
            text-align: right;
        }
    </style>
    `;
}