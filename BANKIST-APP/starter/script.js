'use strict';

// project BANKIST APP

// Data

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Thomas Addisu',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

console.log(accounts[0].pin)

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

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


// console.log(inputCloseUsername.textContent)



// const loginVerify=function () {
//   inputLoginUsername.textContent=== && inputLoginPin.textContent===pin;
// }

// const mymap=new Map(accounts);
// console.log(mymap);

const displayMovements=function (movements,sort=false) {
  containerMovements.innerHTML = '';

  const movs=sort?movements.slice().sort((fir,sec)=>fir-sec):movements;

  movs.forEach((mov,i) => {
    const type=mov>0 ?'deposit':'withdrawal'; 
    const html=`
    <div class="movements">
        <div class="movements__row">
        <div class="movements__type 
        movements__type--${type}">${i+1} 
        ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}</div>
    </div>`

    containerMovements.insertAdjacentHTML('afterbegin',html)

  });
}




const user='Steven Thomas Williams'; //make this user name to 'stw'

const usernameProducer=function([...accs]){
accs.forEach((acc) => {
  acc.username=acc.owner.toLowerCase().split(' ').map((word)=>
    word[0]).join('');
})

}

console.log(usernameProducer(accounts));

console.log(accounts)

// fillter

// const arr=[1,2,3,4,5];
// const arr2=arr.filter((arr)=>arr>2)
// console.log(arr2)

// reduce
const eurToUsd=1.1;
const displaySummary=function(acc) {

const summaryin=acc.movements.filter((mov)=>mov>0)
.map((mov)=>mov*eurToUsd).
  reduce((acu,mov)=>acu+mov).toFixed(2);
labelSumIn.textContent=summaryin;

const summaryout=acc.movements.filter((mov)=>mov<0).
map((mov)=>mov*eurToUsd).
reduce((acu,mov)=>acu+mov).toFixed(2);
labelSumOut.textContent=summaryout;

const summaryInterest=acc.movements.filter((mov)=>mov>0).
map((mov,arr)=>{
  console.log(arr)
  return (mov*acc.interestRate)/100}).
reduce((acu,mov)=>acu+mov).toFixed(2);
labelSumInterest.textContent=summaryInterest;

}



const DisplayBalance=function(acc){
  acc.balance=acc.movements.reduce((acc,cur,i,movs)=> acc + cur
,0)
labelBalance.textContent=`${acc.balance} EUR`;
};

// essential functions
// display update UI
const updateUI=function (acc) {
  // display balance
  DisplayBalance(acc);

  // diplay movement
  displayMovements(acc.movements);

  // diplay summary
  displaySummary(acc);
}

// the magic of chaining methods

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// login

let currentAccount;

btnLogin.addEventListener('click',function(e){
  e.preventDefault();

  currentAccount=accounts.find((obj)=>{
    return obj.username===inputLoginUsername.value;
  })

  console.log(currentAccount)

  if(currentAccount.pin===Number(inputLoginPin.value)){
    // display welcom page
    labelWelcome.textContent=`welcome back, 
    ${currentAccount.owner.split(' ')[0]}`
    // display app
  containerApp.style.opacity=1;
    updateUI(currentAccount);
  }

})

btnTransfer.addEventListener('click',function (e) {
  e.preventDefault();
  const amount=Number(inputTransferAmount.value);
  const reciver=accounts.find((obj)=>
    obj.username===inputTransferTo.value);

  if(amount>0 && amount < currentAccount.balance 
    && reciver.username  && reciver.username!==currentAccount.username ){
      currentAccount.movements.push(-amount);
      reciver.movements.push(amount);
    }

    updateUI(currentAccount);

})

btnClose.addEventListener('click',function(e){
  e.preventDefault();

  const closedAccount=accounts.findIndex(obj=>obj.pin===currentAccount.pin)
  if(currentAccount.pin===Number(inputClosePin.value) &&currentAccount.username===inputCloseUsername.value){
   accounts.splice(closedAccount,1);
  //  diplay app
  containerApp.style.opacity=0;
  
  }
})

btnLoan.addEventListener('click',function (e) {
   e.preventDefault();
   const loanamount=Number(inputLoanAmount.value);

   if(loanamount>0 && currentAccount.movements.some((mov)=>mov>loanamount*0.1)){
    // add loan to user
    currentAccount.movements.push(loanamount);
    // update ui
    updateUI(currentAccount);
   }
})

// balance
const allBalance=accounts.flatMap((obj)=>obj.movements).reduce((acu,cur)=>acu+cur,0)

console.log(allBalance);

// sorting the movements 

let sorted=false;
console.log(currentAccount)
const currentmovsthomas=currentAccount;
      console.log(currentmovsthomas);


btnSort.addEventListener('click',function(e){
      e.preventDefault();
      
      
    displayMovements(currentAccount.movements, !sorted)
    sorted=!sorted;
    
})
