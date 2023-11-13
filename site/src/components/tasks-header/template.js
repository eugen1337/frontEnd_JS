export default function (vm) {
    return `
        <input type="button" value="Обновить" id="update-btn"></br>
        <input type="button" value="Добавить" id="add-btn">
        <input type="text" id="value1" placeholder="a">
        <input type="text" id="value2" placeholder="b">
        <style>  
        input {
            margin:5px;
        } 
        </style>
    `;
}
