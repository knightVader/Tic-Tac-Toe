let boxes=document.querySelectorAll(".box");
let reset=document.querySelector(".reset")
let winmsg=document.querySelector("#msg")
let hide=document.querySelector(".hide")

let turnO=true;

const winPatterns=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

function enable(){
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const resetGame=()=>{
    counter=0;
    turnO=true;
    hide.classList.add("hide");
    enable();
}

let counter=0;

const drawGame = () => {
    hide.classList.remove("hide");
    winmsg.innerText=`Match Draw. Restart The Game`;
}

boxes.forEach((box) =>{

   box.addEventListener("click", () => {
     console.log("clicked");
     counter++;
     if(counter == 9){
         drawGame();
     }

     if(turnO){ // if player o turn
        box.innerText="O";
        turnO=false;
     }
     else{ // if player x turn
        box.innerText="X";
        turnO=true;
     }
     box.disabled=true; // to disable the box once it gets a value

     checkWinner();
   });
});

function disable(){
    for(let box of boxes){
        box.disabled=true;
    }
}

const winner = (pos1) =>{
     winmsg.innerText=`Congratulations! The Winner is ${pos1}`;
     hide.classList.remove("hide")
     disable();
}

const checkWinner = () =>{
    for(let pattern of winPatterns){ // did foe__of because with for__in it was picking nuber as character
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1 === pos2 && pos2===pos3){
                winner(pos1);
                counter=0;
            }
        }
    }
}

reset.addEventListener("click", resetGame);