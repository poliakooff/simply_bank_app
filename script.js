'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500.32, 250, -300.92, 5000, -850, -110.18, -170, 1100],
  interest: 1.5,
  pin: 1111,
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const testData = document.querySelector('.test-data');
const testAccount = document.querySelector('.test-data__account');
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayTransactions = function (transactions, sort = false) {
  containerTransactions.innerHTML = '';

  const transacs = sort
    ? transactions.slice().sort((x, y) => x - y)
    : transactions;

  transacs.forEach(function (trans, index) {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';
    const transTypeTranslate =
      transType === 'deposit' ? 'ДЕПОЗИТ' : 'ВЫВОД СРЕДСТВ';

    const transactionRow = `
    <div class="transactions">
    <div class="transactions__row">
      <div class="transactions__type transactions__type--${transType}">
        ${index + 1} ${transTypeTranslate}
      </div>
      <div class="transactions__date">2 дня назад</div>
      <div class="transactions__value">${trans.toFixed(2)}$</div>
    </div>
    `;
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
    // console.log(containerTransactions.innerHTML);
  });
};

const createNicknames = function (accs) {
  accs.forEach(function (acc) {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createNicknames(accounts);

const displayTestAccountToHTML = function (accounts) {
  testAccount.innerHTML = '';
  accounts.forEach((value, index) => {
    const testAccountDisplay = `<h1 class="test-data__account account${[
      index + 1,
    ]}">${accounts[index].nickname} , ${accounts[index].pin}</h1>`;
    testAccount.insertAdjacentHTML('beforebegin', testAccountDisplay);
  });
};
displayTestAccountToHTML(accounts);

const displayBalance = function (account) {
  const balance = account.transactions.reduce(
    (acc, trans) => (acc += trans),
    0
  );
  account.balance = balance;
  labelBalance.textContent = `${balance.toFixed(2)}$`;

  console.log('---balance---');
  console.log(balance);
};

const displayTotal = function (account) {
  const depositTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = `${depositTotal.toFixed(2)}$`;

  const withdrawaslTotal = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = `${Math.abs(withdrawaslTotal.toFixed(2))}$`;

  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(deposit => (deposit * account.interest) / 100)
    .filter(interest => interest >= 5)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interestTotal.toFixed(2)}$`;
};

const updateUi = function (account) {
  // Display transactions
  displayTransactions(account.transactions);
  // Display balance
  displayBalance(account);
  // Display total
  displayTotal(account);
};

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // e.preventDefault();
  currentAccount = accounts.find(
    account => account.nickname === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Hidden test data
    // testData.style.display = 'none';
    // Display UI and welcome message
    labelWelcome.textContent = `Рады, что вы снова с нами ${
      currentAccount.userName.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;
    containerApp.style.display = 'grid';
    // Clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUi(currentAccount);
  }
});

// Event Listener

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    account => account.nickname === recipientNickname
  );

  inputTransferTo.value = '';
  inputTransferAmount.value = '';

  if (
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    recipientAccount &&
    currentAccount.nickname !== recipientAccount.nickname
  ) {
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    updateUi(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const confirmName = inputCloseUsername.value;
  const confirmPin = +inputClosePin.value;
  if (
    currentAccount.nickname === confirmName &&
    confirmPin === currentAccount.pin
  ) {
    const currentAccountIndex = accounts.findIndex(
      account => account.nickname === currentAccount.nickname
    );
    accounts.splice(currentAccountIndex, 1);

    // Hid UI and welcome message
    labelWelcome.textContent = `Войдите в свой аккаунт`;
    containerApp.style.opacity = 0;
    containerApp.style.display = 'none';
  }
  inputCloseUsername.value = '';
  inputClosePin.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);
  const isThisDealOverTenPercent = currentAccount.transactions.some(
    trans => trans >= (loanAmount * 10) / 100
  );
  if (loanAmount > 0 && isThisDealOverTenPercent) {
    // currentAccount.loan.push(loanAmount);
    updateUi(currentAccount);
    currentAccount.transactions.push(loanAmount);
    console.log(account1);
  }
});

let transactionsSorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayTransactions(currentAccount.transactions, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
  if (transactionsSorted) {
    btnSort.style.color = 'green';
  } else {
    btnSort.style.color = 'black';
  }
});
