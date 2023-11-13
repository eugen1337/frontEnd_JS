export default function(vm) {
    return `
    <fieldset>
        <span>Количество задач: ${vm.status.count}</span>
        <span>В ожидании: ${vm.status.waiting}</span>
        <span>Выполняются: ${vm.status.processing}</span>
        <span>Выполнены: ${vm.status.processed}</span>
    </fieldset>
    `;
}
