let boxes=document.querySelectorAll(".box");
let reset=document.querySelector(".reset");
let winmsg=document.querySelector("#msg");
let intro=document.querySelector(".intro");
let winblock=document.querySelector(".winner");
let player1=document.querySelector("#play1");
let player2=document.querySelector("#play2");
let submit=document.querySelector(".sbtn");
let playmsg=document.querySelector(".playmsg")
let p1score=document.querySelector("#p1score");
let p2score=document.querySelector("#p2score");
let newgame=document.querySelector(".ngame");
let body=document.querySelector("body");
let headmode=document.querySelector(".head-mode");
let moon=document.querySelector(".icon-moon");
let sun=document.querySelector(".icon-sun");
let footer=document.querySelector(".footer");

let modechanger="light";
const ModeChanger=()=>{
    if(modechanger=="light"){
        modechanger="dark";
        body.classList.add("dark-body")
        moon.classList.add("hide")
        sun.classList.remove("hide")
        footer.classList.add("footer-dark")
    }
    else{
        modechanger="light";
        body.classList.remove("dark-body")
        moon.classList.remove("hide")
        sun.classList.add("hide")
        footer.classList.remove("footer-dark")
    }
}


headmode.addEventListener("click", ModeChanger);

let play1, play2;
let countp1=0, countp2=0;

submit.addEventListener("click", (event)=>{
    if(player1.value != "" && player2.value != ""){
        event.preventDefault(); // default behaviour of submiting form cancelled
        console.log(player1.value, player2.value);
        play1=player1.value;
        play2=player2.value;
        intro.classList.add("hide");
        playmsg.innerText=`Player ${play1}'s move`;
    }
})

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

const startNewGame=()=>{
    countp1=0;
    countp2=0;
    counter=0;
    turnO=true;
    player1.value="";
    player2.value="";
    playmsg.innerText="";
    winblock.classList.add("hide");
    intro.classList.remove("hide");
    enable();
}

const resetGame=()=>{
    counter=0;
    turnO=true;
    winblock.classList.add("hide");
    playmsg.innerText=`Player ${play1}'s move`;
    enable();
}

let counter=0;

const drawGame = () => {
    winblock.classList.remove("hide")
    winmsg.innerText=`Match Draw. Restart The Game`;
    p1score.innerText=`${play1}'s Score is ${countp1}`;
    p2score.innerText=`${play2}'s Score is ${countp2}`;
}

boxes.forEach((box) =>{

   box.addEventListener("click", () => {
     console.log("clicked");
     counter++;
     if(counter == 9){
         drawGame();
     }

     if(turnO){ // if player o turn
        playmsg.innerText=`Player ${play2}'s move`;
        box.innerText="O";
        turnO=false;
     }
     else{ // if player x turn
        playmsg.innerText=`Player ${play1}'s move`;
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

    winblock.classList.remove("hide");
    if(pos1=="O"){
        winmsg.innerText=`The Winner is ${play1}`;
        countp1++;
    }
    else{
        winmsg.innerText=`The Winner is ${play2}`;
        countp2++;
    }
    p1score.innerText=`${play1}'s Score is ${countp1}`;
    p2score.innerText=`${play2}'s Score is ${countp2}`;

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

newgame.addEventListener("click", startNewGame);
reset.addEventListener("click", resetGame);