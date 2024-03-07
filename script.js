'use strict';

const reset = document.querySelector(".btn--new");
const dice = document.querySelector(".dice");
const roll = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
let number = 0;
let active = 0;
let gameOver = false;
const players = [];

const player1 = {
    block: document.querySelector(".player--0"),
    score: document.querySelector("#score--0"),
    current: document.getElementById("current--0"),
    points: 0,
    hold: false
};

const player2 = {
    block: document.querySelector(".player--1"),
    score: document.getElementById("score--1"),
    current: document.getElementById("current--1"),
    points: 0,
    hold: false
};

players.push(player1);
players.push(player2);

let player = player1;

function track() {
    if (!gameOver) {
        active = active === 0 ? 1 : 0;
        console.log(active);
        player.current.textContent = 0;
        player.block.classList.remove("player--active");
        player = active === 0 ? player1 : player2;
        player.block.classList.add("player--active");
    }
}

const resetGame = function (selection = 1) {
    console.log("reset button clicked");
    if (!dice.classList.contains("hidden")) {
        dice.classList.add("hidden");
        for (let i = 0; i < 2; i++) {
            players[i].score.textContent = 0;
            players[i].current.textContent = 0;
            if (selection === 1) {
                players[i].block.classList.remove("player--winner");
                players[i].points = 0;
                players[i].hold = false;

                number = 0;
                active = 0;
                gameOver = false;

                if (i == 0) {
                    if (!players[i].block.classList.contains("player--active")) {
                        players[i].block.classList.add("player--active");
                    }
                } else {
                    players[i].block.remove("player--active");
                }
            }
        }
    }
}

resetGame(0);
reset.addEventListener("click", resetGame);
roll.addEventListener("click", function () {
    if (!gameOver) {
        dice.classList.remove("hidden");
        number = Math.floor(Math.random() * 6) + 1;
        dice.src = `dice-${number}.png`;
        if (number !== 1) {
            player.points += number;
            player.current.textContent = player.points;
            if (Number(player.score.textContent) >= 100) {
                gameOver = true;
                player.block.classList.add("player--winner");
                dice.classList.add("hidden");
            }
        } else {
            track();
        }
    }
});
hold.addEventListener("click", function () {
    player.hold = true;
    player.score.textContent = player.current.textContent;
    track();
});