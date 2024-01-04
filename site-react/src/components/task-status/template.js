export default function(vm) {
    return `
    <fieldset>
        <span>Количество задач: ${vm.status.count}</span>
    </fieldset>
    `;
}

{/* <span>В ожидании: ${vm.status.waiting}</span>
<span>Выполнены: ${vm.status.processed}</span> */}
