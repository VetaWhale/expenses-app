const GOOD_STATUS = 'Все хорошо';
const BAD_STATUS = 'Все плохо';
const ZERO = 0;
const CUR = 'руб.'

const inputValueNode = document.getElementById('input-value');
const buttonAddHistory = document.getElementById('button-add');
const buttonClear = document.getElementById('button-clear')
const historyList = document.getElementById('history-list');
const sumNode = document.getElementById('sum');
const limitNode = document.getElementById('limit');
const statusNode = document.getElementById('status');
const categoryList = document.getElementById('category-list');
const buttonLimit = document.querySelector('.button-limit');

let limit = parseInt(limitNode.innerText);

init();

let expenses = [];

function init() {
    sumNode.innerText = `${ZERO} ${CUR}`;
    limitNode.innerText = `${limit} ${CUR}`;
    statusNode.innerText = GOOD_STATUS;
}

buttonAddHistory.addEventListener('click', function() {
    let spend = getValueFromUser();

    if(!spend) return;

    let category = getCategoryFromUser();

    if (category === "Категории") return;

    const newExpense = {
        spend: spend,
        category: category,
    }

    expenses.push(newExpense);

    render();

    clearInput();
})

buttonClear.addEventListener('click', function() {
    init();
    clearHistory();
})

buttonLimit.addEventListener('click', function() {
    addNewLimit();
})

function clearHistory() {
    expenses = [];
    render();
}

function getValueFromUser() {
    let inputValue = parseInt(inputValueNode.value);

    return inputValue;
}

function getCategoryFromUser() {
    return categoryList.value;
}

function clearInput() {
    inputValueNode.value = '';
}

function getExpenses() {
    return expenses;
}

function render() {
    renderStatus();
    renderHistory();
}

function renderHistory() {
    const expenses = getExpenses();

    let historyHTML = '';

    expenses.forEach(expense => {
        const expenseHTML = `<li>${expense.spend} ${CUR} - ${expense.category}</li>`;
        historyHTML += expenseHTML;
    });
    
    historyList.innerHTML = historyHTML;
}

function renderSum() {
    let sum = 0;
    
    expenses.forEach(expense => {
        sum += expense.spend;
    });
    
    return sum;
}

function renderStatus() {
    let sum = renderSum();
    sumNode.innerText = `${sum} ${CUR}`;
    let odds = limit - sum;

    if (sum <= limit) {
        statusNode.innerText = GOOD_STATUS;
        statusNode.classList.remove('red');
    } else {
        statusNode.innerText = `${BAD_STATUS} (${odds} ${CUR})`;
        statusNode.classList.add('red');
    }
}

function addNewLimit() {
    const newLimit = prompt('Установите новый лимит');

    const newLimitValue = parseInt(newLimit);

    if(!newLimitValue) return;

    limitNode.innerText = newLimitValue;

    limit = newLimitValue;

    renderStatus();
}