let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");

let score = document.querySelector(".count");
let resultElement = document.querySelector(".result");

let options = ["rock" , "paper" , "scissors"];
let playerScore = 0;
let computerScore = 0;


const playGame = (playerChoice)=>{
    let computerChoice = Math.floor(Math.random() * 3);
    console.log("Computer chose: " + options[computerChoice]);

    if(playerChoice === options[computerChoice]){
        showResult(options[computerChoice] , "none" , "draw");
        return;
    }else if(playerChoice === "rock" && options[computerChoice] === "scissors"){
        playerScore++;
        showResult(options[computerChoice] , "You" ,);
    }else if(playerChoice === "scissors" && options[computerChoice] === "rock"){
        computerScore++;
        showResult(options[computerChoice] , "Computer");
    }else if(playerChoice === "scissors" && options[computerChoice] === "paper"){
        playerScore++;
        showResult(options[computerChoice] , "You" ,);
    }else if(playerChoice === "paper" && options[computerChoice] === "scissors"){
        computerScore++;
        showResult(options[computerChoice] , "Computer");
    }else if(playerChoice === "paper" && options[computerChoice] === "rock"){
        playerScore++;
        showResult(options[computerChoice] , "You" ,);
    }else if(playerChoice === "rock" && options[computerChoice] === "paper"){
        computerScore++;
        showResult(options[computerChoice] , "Computer");
    }

    showScore(playerScore , computerScore);
}

const showScore = (playerScore, computerScore) => {
    score.innerHTML = `
        <div class="PlayerScore">
            <h2>Player</h2>
            <h2 class="scoreCard">${playerScore}</h2>
        </div>
        <div class="ComputerScore">
            <h2>Computer</h2>
            <h2 class="scoreCard">${computerScore}</h2>
        </div>`;
    
    console.log(score.innerHTML);
};

const showResult = (computerChoice , winner , result="win" )=>{
    if(result === "draw"){
        resultElement.innerText = `Computer also chose ${computerChoice}. It was a draw`;
        resultElement.style.display = "block";
        return;
    }

    resultElement.innerText = `Computer chose ${computerChoice}. The winner is ${winner}.`
    resultElement.style.display = "block";
}

showScore(0,0);

rock.addEventListener('click' , ()=>{
    playGame("rock");
})

paper.addEventListener('click' , ()=>{
    playGame("paper");
})

scissors.addEventListener('click' , ()=>{
    playGame("scissors");
})