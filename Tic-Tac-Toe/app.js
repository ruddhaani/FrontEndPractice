let boxes = document.querySelectorAll(".box");

let turnX = true;

let resetBtn = document.querySelector("#reset");

let winnerMessage = document.querySelector(".winnerMessage");

let winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box) => {
    box.addEventListener('click',()=>{
        // console.log('box clicked');
        if(turnX){
            box.innerText = "X";
            turnX = false;
        }else{
            box.innerText = "O";
            turnX = true;
        }

        box.disabled = true;
        checkWinner();
    })
})

const checkWinner = ()=>{
    for(position of winConditions){
        let posOneVal = boxes[position[0]].innerHTML;
        let posTwoVal = boxes[position[1]].innerHTML;
        let posThreeVal = boxes[position[2]].innerHTML;

        if(posOneVal != "" && posTwoVal != "" && posThreeVal != ""){
            if(posOneVal === posTwoVal && posTwoVal === posThreeVal){
                console.log("Winner is " , posOneVal);
                showWinner(posOneVal);

                boxes.forEach((box)=>{
                    box.disabled = true;
                })
            }
        }
    }
}

const showWinner = (winner)=>{
    winnerMessage.innerHTML = `Winner is ${winner}`;
    winnerMessage.style.display = 'block';
}

const resetGame = ()=>{
    boxes.forEach((box)=>{
        box.innerHTML = "";
        box.disabled = false;
        winnerMessage.innerHTML = "";
        winnerMessage.style.display = "hidden";
        turnX = true;
    })
}
