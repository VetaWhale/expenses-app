// задается переменая со значением лимита
const LIMIT = 15000;
// заводим переменные для фраз
const GOOD_STATUS_LIMIT = 'Все хорошо';
const BAD_STATUS_LIMIT = 'Все плохо';
const BAD_STATUS_LIMIT_CLASSNAME = document.querySelector('.limit_red');
const RUB = 'руб.';

const buttonAddNode = document.getElementById('button-add');
const buttonClearNode = document.getElementById('button-clear');
const inputValueNode = document.getElementById('input-value');
const categoryListNode = document.getElementById('category-list');
const limitNode = document.getElementById('limit');
const totalNode = document.getElementById('sum');
const statusNode = document.getElementById('status');
const historyListNode = document.getElementById('history-list');

const expenses = [];

let limit = parseInt(limitNode.innerText);

function getValueFromUser(expense) {
    if(!inputValueNode.value) {
        return
    }

    const expense = parseInt(inputValueNode.value);

    clearInput();

    return expense;
}
function setExpense(expense) {
    expenses.push(expense);
}
function clearInput() {
    inputValueNode.value = '';
}
function renderHistory(expenses) {
    historyListNode.innerHTML = '';
    expenses.forEach(expense => {
        const historyItem = document.createElement('li');
        historyItem.classList.add('rub');
        historyItem.innerText = expense;

        historyListNode.appendChild(historyItem);
    });
}
function calculateExpenses(expenses) {
    let sum = 0;
    expenses.forEach(element => {
        sum += element;
    });
    return sum;
}
function renderSum(expenses) {
    totalNode.innerText = calculateExpenses();
}
function renderStatus(sum) {
    const sum = calculateExpenses(expenses)
    if (sum <= LIMIT) {
        statusNode.innerText = GOOD_STATUS_LIMIT;
    } else {
        statusNode.innerText = BAD_STATUS_LIMIT;
        statusNode.classList.add(BAD_STATUS_LIMIT_CLASSNAME);
    }
}
function render(expenses) {
    const sum = calculateExpenses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
}



buttonAddNode.addEventListener('click', function () {
    const expense = getValueFromUser();

    if (!expense) {
        return;
    }

    setExpense(expense);

    render(expenses);
})
buttonClearNode.addEventListener('click', function() {
    
})