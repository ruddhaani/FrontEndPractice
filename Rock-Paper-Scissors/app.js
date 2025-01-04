let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");

let score = document.querySelector(".count");

let options = ["rock" , "paper" , "scissors"];
let playerScore = 0;
let computerScore = 0;


const playGame = (playerChoice)=>{
    let computerChoice = Math.floor(Math.random() * 3);
    console.log("Computer chose: " + options[computerChoice]);

    if(playerChoice === options[computerChoice]){
        return;
    }else if(playerChoice === "rock" && options[computerChoice] === "scissors"){
        playerScore++;
    }else if(playerChoice === "scissors" && options[computerChoice] === "rock"){
        computerScore++;
    }else if(playerChoice === "scissors" && options[computerChoice] === "paper"){
        playerScore++;
    }else if(playerChoice === "paper" && options[computerChoice] === "scissors"){
        computerScore++;
    }else if(playerChoice === "paper" && options[computerChoice] === "rock"){
        playerScore++;
    }else if(playerChoice === "rock" && options[computerChoice] === "paper"){
        computerScore++;
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