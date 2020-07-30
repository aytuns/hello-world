
const cards= document.querySelectorAll(".memory-card");
const cardSpace = document.querySelector(".memory-game");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
const resultDisplay = document.querySelector('#result');
let cardsCount = 0;
let cardsWon = [];
let count = 59;
const countDown = document.querySelector("#timer");


(function timer(){
	alert('Your game starts now');
	let counter =	setInterval(()=>{
	countDown.textContent = count;
		count--;
		if (count === -1) {
		cardSpace.style.visibility = 'hidden';
		clearInterval(counter);
		}

		},1000);
})();



function flipCard(){
	if (lockBoard) return;
	if (this === firstCard) return;
	this.classList.add('flip');

	if (!hasFlippedCard){
		// first click
		hasFlippedCard = true;
		firstCard = this;
	}else{
		// second click
		hasFlippedCard = false;
		secondCard = this;

		checkForMatch();
	}
}

function checkForMatch(){
	let isMatch= firstCard.dataset.name === secondCard.dataset.name;
	isMatch? disableCards():unflipCards();
	
}

function disableCards(){
	setTimeout(()=>{
		firstCard.removeEventListener('click', flipCard);
		secondCard.removeEventListener('click', flipCard);
		resetBoard()
		alert("You've found a match")
		cardsCount++;
		cardsWon.push(cardsCount);
		resultDisplay.textContent = cardsWon.length;
		
		if (cardsWon.length===6){
		alert("YOU HAVE WON");
		clearInterval(this.timer.counter);
		}
	},500)
}

function unflipCards(){
	lockBoard = true
	setTimeout(()=>{
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');	
		resetBoard()
		alert('sorry, try again')
	},500);
}

function resetBoard(){
	[hasFlippedCard, lockBoard] =[false,false];
	[firstCard, secondCard] = [null, null];
}

(function shuffle(){
	cards.forEach(card=>{
		let randomPos = Math.floor(Math.random()*12);
		card.style.order= randomPos;
	});
})();

cards.forEach(card=>card.addEventListener('click',flipCard));
