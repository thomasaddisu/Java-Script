'use strict';


const score0El=document.querySelector('#score--0');
const score1El=document.querySelector('#score--1');
const dice=document.querySelector('.dice');
const roll=document.querySelector('.btn--roll');
const currentscore0=document.querySelector('#current--0');
const currentscore1=document.querySelector('#current--1');
const player0=document.querySelector('.player--0');
const player1=document.querySelector('.player--1');
const hold=document.querySelector('.btn--hold');
const newgame=document.querySelector('.btn--new');

//we use array to store the total score for individual players 
let score=[0,0];
let currentscore=0;
//let activeplayer=currentscore0;
let activeplayer=0;
let isplaying=true;

 score0El.textContent=0;
 score1El.textContent=0;
 dice.classList.add('hidden');

const switchplyer=function(){
   currentscore=0;
document.getElementById(`current--${activeplayer}`).textContent=0;
activeplayer=activeplayer===0?1:0;

//the current score and the active player score is must to be zero
currentscore=0;

// to change the active player background color 
player0.classList.toggle('player--active');
player1.classList.toggle('player--active');
}



//rooling dice functionaliy 
 roll.addEventListener('click',function(){
    if (isplaying) {
      
    
    dice.classList.remove('hidden');
    const diceValue=Math.floor(Math.random()*6)+1;

    // print the image based on the dice value generated above
    dice.src=`dice-${diceValue}.png`;
  
    // checking the dice value is 1 or not 

    if(diceValue!==1){
        // to print the total value of the crrent value
       currentscore+=diceValue;
    //print the current value to player 0 the left player
    //   (activeplayer===currentscore0)?currentscore0.textContent=currentscore:currentscore1.textContent=currentscore;
       document.getElementById(`current--${activeplayer}`).textContent=currentscore;

       
    }else{
        /*(activeplayer===currentscore0)?activeplayer=currentscore1:activeplayer=currentscore0;
        currentscore0.textContent=0;
        currentscore1.textContent=0;
        */
       //the current score and the active player score is must to be zero
    
       switchplyer();
      }
    }     
});

// to hold the current value
let score0=0,score1=0;
hold.addEventListener('click',function(){
   if (isplaying) {
      
   
 score[activeplayer]+=currentscore;
 document.getElementById(`score--${activeplayer}`).textContent=score[activeplayer];

  /* if (activeplayer===0 && dice!==1) {
      score0+=currentscore;
      score0El.textContent=score0;
      currentscore=0;
      document.getElementById(`current--${activeplayer}`).textContent=0;
      if (score0 >= 10) {
         player0.style.backgroundColor='black';
         
            document.querySelector('#name--0').textContent='from Tom🥇';
            document.querySelector('#name--0').style.color='white';
      
      }

*/
// checking is there any winner untile know
if (score[activeplayer]>=100) {
   isplaying=false;
   document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
   document.getElementById(`name--${activeplayer}`).textContent='from Tom🥇';
   document.getElementById(`name--${activeplayer}`).style.color='white';
}

// switching player

switchplyer();

/*
   }else if (activeplayer===1 && dice!==1) {
      score1+=currentscore;
      score1El.textContent=score1;
      currentscore=0;
      document.getElementById(`current--${activeplayer}`).textContent=0;

      if (score1 >= 10) {
         player1.style.backgroundColor='black';
         document.querySelector('#name--1').textContent='from Tom🥇';
         document.querySelector('#name--1').style.color='white';
      }

   }*/
   }
})

newgame.addEventListener('click',function (){
   console.log('i alresdy preesed')
   isplaying=true;
   
   document.getElementById(`current--1`).textContent=0;
   document.getElementById(`score--0`).textContent=0;
   document.getElementById(`score--1`).textContent=0;
   document.getElementById(`current--0`).textContent=0;
   for (let i = 0; i < 2; i++) {
      document.querySelector(`.player--${[i]}`).classList.remove('player--winner');
      document.getElementById(`name--${[i]}`).textContent=`player ${[i]}`;
      document.getElementById(`name--${[i]}`).style.color='black'; 
   }
   dice.classList.add('hidden');
   
   
   currentscore=0;
   score=[0,0];

})




