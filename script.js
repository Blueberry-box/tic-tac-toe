const gameboard = (() => {
    let state = [
        null, null, null,
        null, null, null,
        null, null, null,
    ];


    const resetGame = function () {
        for (let i = 0; i < state.length; i++) {
            state[i] = null;
        }

    }


    const isGameWon = function () {
        const allEqual = (array) => {
            let combo = array.join("");
            if (combo === "XXX" || combo === "OOO") {
                return true;
            } else {
                return false;
            }
        };

        const winningPossibilities = [
            [state[0],  state[3], state[6]],
            [state[1],  state[4], state[7]],
            [state[2],  state[5], state[8]],
            [state[0],  state[1], state[2]],
            [state[3],  state[4], state[5]],
            [state[6],  state[7], state[8]],
            [state[0], state[4], state[8]],
            [state[2], state[4], state[6]]
        ];

        let winSubArray = winningPossibilities.find(allEqual);
        winSubArray? winSubArray = winSubArray.join(""): false;

        if (winSubArray === "XXX" || winSubArray === "OOO") {
            return true;
        } else {
            return false;
        }
    }

    const isSlotFree = function (slot) {
        if (state[slot] !== null) {
            return false;
        } else {
            return true;
        }
    }
    return {state, isGameWon, isSlotFree, resetGame};

})();


function createPlayer (name, symbol, goFirst) {
    let isMyTurn = goFirst;

    const playMove = function (slot) {
        gameboard.state[slot] = symbol;
    }
    return {playMove, isMyTurn, name, symbol};
}

function drawGame () {

    const cellList = document.querySelectorAll(".cell");

    for (let i = 0; i < cellList.length; i++) {
        let correctSymbol = gameboard.state[i];
        cellList[i].textContent = correctSymbol;
    }
}


const gameFlow = (() => {
    const page1 = document.querySelector(".page1");
    const page2 = document.querySelector(".page2");
    const page = document.querySelector("body");
    const start = document.querySelector(".play");


    page2.remove();
    let player1name, player2name;
    let player1, player2;
    start.addEventListener("click", () => {
        player1name = document.getElementById("name1").value;
        player2name = document.getElementById("name2").value;
        page1.remove();
        page.appendChild(page2);

        drawGame();
        player1 = createPlayer(player1name, "X", true);
        player2 = createPlayer(player2name, "O", false);

        const gameinfo = document.querySelector(".gameinfo");
        gameinfo.textContent = `${player1.name}'s turn`;


        const swapTurns = function () {
            player1.isMyTurn = !player1.isMyTurn;
            player2.isMyTurn = !player2.isMyTurn;
        }

        let turncount = 0;

        const cellList = document.querySelectorAll(".cell");

        const resetTheGame = function () {
            turncount = 0;
            player1.isMyTurn = true;
            player2.isMyTurn = false;
            const resetButton = document.createElement("button");
            resetButton.textContent = "RESET";
            resetButton.classList.add("resetButton");
            page2.appendChild(resetButton);

            resetButton.addEventListener("click", () => {
                gameboard.resetGame();
                drawGame();
                gameinfo.textContent = `${player1.name}'s turn`;
                resetButton.remove();
            });
        }

        cellList.forEach((item) => {
            item.addEventListener("click", (e) => {
                let nr = item.dataset.indexNumber;
                if (gameboard.isGameWon() === false && gameboard.isSlotFree(nr) === true) {
                    if (player1.isMyTurn) {
                        player1.playMove(nr);
                        gameinfo.textContent = `${player2.name}'s turn, Symbol: ${player2.symbol}`;
                        turncount++;
                        swapTurns();
                    } else {
                        player2.playMove(nr);
                        gameinfo.textContent = `${player1.name}'s turn, Symbol: ${player1.symbol}`;
                        turncount++;
                        swapTurns();
                    }
                    if (gameboard.isGameWon() === true) {
                        if (turncount % 2 === 0) {
                            gameinfo.textContent = `${player2.name} won!`;
                        } else {
                            gameinfo.textContent = `${player1.name} won!`;
                        }
                        resetTheGame();
                    } else if (gameboard.isGameWon() === false && gameboard.state.includes(null) === false) {
                        gameinfo.textContent = `A tie!`;
                        resetTheGame();
                    }
                    drawGame();
                }
            })
        })
    });
})();