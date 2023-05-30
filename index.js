// задается переменая со значением лимита
const LIMIT = 15000;
// заводим переменные для фраз
const GOOD_STATUS_LIMIT = 'Все хорошо';
const BAD_STATUS_LIMIT = 'Все плохо';
const BAD_STATUS_LIMIT_CLASSNAME = document.querySelector('.limit_red');
const RUB = 'руб.';

const inputNode = document.getElementById('input-value');
const categoryListNode = document.getElementById('category-list');
const buttonNode = document.getElementById('button-add');
const buttonClearNode = document.getElementById('button-clear');
const historyNode = document.getElementById('history-list');
const sumNode = document.getElementById('sum');
const limitNode = document.getElementById('limit');
const statusNode = document.getElementById('status')

// массив для сохранения истории покупок
const expenses = [];

const limit = parseInt(limitNode.innerText);

init(expenses);


// функция для записания первичных значений
function init() {
    sumNode.innerText = calculateExpenses(expenses);
    limitNode.innerText = LIMIT;
    statusNode.innerText = GOOD_STATUS_LIMIT;
}

// функция добавления в массив из переменной
function trackExpense(expense) {
    // в наш массив с историей покупок добавляем преобразованное число
    expenses.push(expense);
}

// функция добавления в переменную преобразованного числа из поля ввода и его очищения 
function getExpenseFromUser(expense) {
    // если в инпут не ввели значение, прекратить
    if (!inputNode.value) {
        return null;
    }

    // создаем переменную для преобразования веденого значения пользователем в число
    // const expense = parseInt(inputNode.value);
    
    clearInput();

    return expense;
}

// функция для создания структуры
// высчитываем сумму, 
// далее создаем историю передавая наш массив, 
// создаем новую сумму и передаем туда посчитанную, 
// и создаем статус, передавая сумму
function render(expenses) {
    const sum = calculateExpenses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
}

// функция для очищения поля ввода
function clearInput() {
    // и очищаем наш инпут
    inputNode.value = '';
}
// функция для подсчета суммы
function calculateExpenses(expenses) {
    // создаем переменную суммы для складывания всех трат
    let sum = 0;
    // цикл для складывания суммы
    expenses.forEach(element => {
        sum += element;
    });

    return sum;
}

// функция для отрисовки HTML
function renderHistory(expenses) {
    // создаем переменную для создания и вкладывания в нее html структуру
    historyNode.innerHTML = "";

    // создаем цикл для создания карточек
    expenses.forEach((expense) => {
        const historyItem = document.createElement('li');
        historyItem.className = 'rub';
        historyItem.innerText = expense;

        historyNode.appendChild(historyItem);
    });
}

// функция для отрисовки суммы
function renderSum(sum) {
    // записываем содержание в наш html файл
    sumNode.innerText = sum;
}

// функция для проверки лимита
function renderStatus(expenses) {
    const total = calculateExpenses(expenses);
    totalValueNode.innerText = total;
    // запускаем проверку, что если сумма больше лимита, мы меняем тект
    if (sum <= LIMIT) {
        statusNode.innerText = GOOD_STATUS_LIMIT;
    } else {
        statusNode.innerText = `${BAD_STATUS_LIMIT} (${limit - total})`;
        statusNode.classList.add(BAD_STATUS_LIMIT_CLASSNAME);
    }
}
function addButtonHandler(params) {
    
}
function clearButtonHandler() {
    expenses = [];
    render();
}

// -------------------ОБРАБОТЧИКИ КЛИКОВ------------------
// обработчик события по клику кнопки 'Добавить'
buttonNode.addEventListener('click', function() {
    //в переменную expense записывается функция 
    const expense = getExpenseFromUser();

    // если пустой ввод - выйти
    if(!expense) {
        return;
    }

    trackExpense(expense);

    render(expenses);
});

// обработчик события по клику кнопки 'Очистить историю'
buttonClearNode.addEventListener('click', clearButtonHandler);