let gameSeq = [];
let userSeq = [];
let h2 = document.querySelector("h2");

let started = false;
let level = 0;

let maxScore=0;

let btns = ["red", "yellow", "green", "purple"];

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);

}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

function levelUp() {
    level++;
    userSeq = [];
    // level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameFlash(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
}

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        setTimeout(levelUp, 1000);
    }
});

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            levelUp();
        }
    } else {
         if (level > maxScore) {
            maxScore =level;
        }
    console.log("high score",maxScore);
        h2.innerHTML = `Game over !  Your score was ${level} !! <br> 
        High Score : ${maxScore} <br>
        Press any key to start`;
       
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white"
        }, 150);
        reset();

    }
}

function reset() {

    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
