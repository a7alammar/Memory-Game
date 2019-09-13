
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// store cards in Array
const arrayCards = document.getElementsByClassName("card");

function addCards() {
    const ulElement = document.querySelector(".deck");
    let shuffledCards = shuffle(arrayCards);
    for (const card of shuffledCards){
        const li = document.createElement("li");
        li.classList.add("card");
        li.innerHTML = card;
        ulElement.appendChild(card);
    }
}

addCards();

let isStartCard = true;
let clickedCards = [];
let matchedCards = [];

document.querySelector(".deck").addEventListener("click" , function(e){
    if (isStartCard){
        startTimer();
        isStartCard = false ;
    }
    let tempCard = e.target;
    let previousCard = clickedCards[0];

    if(clickedCards.length === 1) {

        tempCard.classList.add("open", "show");
        clickedCards.push(e.target);

        match(tempCard, previousCard);

    } else {
        tempCard.classList.add("open", "show");
        clickedCards.push(e.target);
    }
    
});


function match(tempCard, previousCard) {

    if(tempCard.innerHTML === previousCard.innerHTML) {
                
        tempCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(tempCard, previousCard);

        clickedCards = [];

        // Check if all cards in the deck matched
        isAllMatched();

    } else {
        
        // delay 700ms then
        setTimeout(function() {
            tempCard.classList.remove("open", "show");
            previousCard.classList.remove("open", "show");
            
        }, 700);

        clickedCards = [];
        
    }
    moveAndRate();
}

function isAllMatched() {
    if(matchedCards.length === arrayCards.length) {
        stopTimer();
        document.querySelector(".time-rate").innerHTML = "You Took a " + timer.innerHTML + " And Your rate is " + stars.innerHTML ;
        document.querySelector(".pop-up").classList.add("display");
    }
}


const moves = document.querySelector(".moves");
moves.innerHTML = 0;
let moveCounter = 0;

const stars = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
stars.innerHTML = star + star + star + star + star;

function moveAndRate() {

    moveCounter += 2 ;
    moves.innerHTML = moveCounter;

    if( moveCounter < 17) {
        stars.innerHTML = star + star + star + star + star ;
    } else if( moveCounter < 27) {
        stars.innerHTML = star + star + star + star;
    } else if (moveCounter < 37){
        stars.innerHTML = star + star + star;
    }
    else if (moveCounter < 47){
        stars.innerHTML = star + star ;
    }
    else {
        stars.innerHTML = star;

    }
}

const timer = document.querySelector(".timer");
let interval, seconds = 0, minutes = 0;

function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minutes + " Minutes " + "  " + seconds + " Seconds";
        seconds++; 
        if(seconds == 60){
            minutes++;
            seconds = 0;
        }
    },1000);
}

function stopTimer() {
    clearInterval(interval);
}


function resetCards () {
    const cc = document.getElementsByClassName("card");
    for (let c of cc ) {
        c.classList.remove("open" , "show" , "match");
    }
}


function reset() {

    resetCards();

    matchedCards = [];
    clickedCards = [];

    moveCounter = 0;
    moves.innerHTML = moveCounter;

    stars.innerHTML = star + star + star + star +star ;

    stopTimer();
    isStartCard = true;
    minutes = 0;
    seconds = 0;
    timer.innerHTML = minutes + "Minutes";
    timer.innerHTML = seconds + "Seconds";

    addCards();
    document.querySelector(".pop-up").classList.remove("display");
}

const restart = document.querySelector(".restart");
restart.addEventListener("click", function() {
    reset();
});

