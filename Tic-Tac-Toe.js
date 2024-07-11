let boxes = document.querySelectorAll(".box");
let reset_game = document.querySelector("#reset-btn");
let new_game = document.querySelector("#new-btn");
let winnerMsg = document.querySelector("#winner");


let turnO = true // PlayerX, PlayerO
let count = 0;
const winPatterns =[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


const resetGame = () =>{
    // console.log("Game reset");
    turnO = true;
    winnerMsg.style.visibility = "hidden";
    count=0;
    enableBoxes();  
}


boxes.forEach((box) => {
    
    box.addEventListener("click", () =>{
        // console.log("Box clickes");
        
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        // console.log(count);
        if(count == 9 && !checkWinner()){
            gameDraw();
        }
        checkWinner();
    })
});

const enableBoxes = () =>{
    for(box of boxes){
        box.disabled = false;
        box.innerText ="";
    }
}

const disableBoxes = () =>{
    for(box of boxes){
        box.disabled = true;
    }
}
const checkWinner = () =>{
    for(pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
}

const showWinner = (pos1Val) =>{
    winnerMsg.innerHTML = "Winner is "+pos1Val;
    winnerMsg.style.visibility = "visible";
    disableBoxes();
}

const gameDraw = () =>{
    winnerMsg.innerHTML = "Game was a draw";
    winnerMsg.style.visibility = "visible";
    disableBoxes();
}

reset_game.addEventListener("click", resetGame);
new_game.addEventListener("click", resetGame);
