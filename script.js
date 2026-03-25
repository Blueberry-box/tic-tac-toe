const gameboard = (() => {
    const state = [
        null, null, null,
        null, null, null,
        null, null, null,
    ];


    const printGameState = function () {
        console.log(state[0],  state[1], state[2]);
        console.log(state[3],  state[4], state[5]);
        console.log(state[6],  state[7], state[8]);
    }


    const isGameWon = function () {
        const allEqual = (array) => array.every(element => element === state[0] && state[0] !== null);

        let col1, col2, col3, row1, row2, row3, d1, d2;
        col1 = [state[0],  state[3], state[6]];
        col2 = [state[1],  state[4], state[7]];
        col3 = [state[2],  state[5], state[8]];

        row1 = [state[0],  state[1], state[2]];
        row2 = [state[3],  state[4], state[5]];
        row3 = [state[6],  state[7], state[8]];

        d1 = [state[0], state[4], state[8]];
        d2 = [state[2], state[4], state[6]];
        if (allEqual(col1) ||
            allEqual(col2) ||
            allEqual(col3) ||
            allEqual(row1) ||
            allEqual(row2) ||
            allEqual(row3) ||
            allEqual(d1) ||
            allEqual(d2)
            ) {
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
    return {state, isGameWon, isSlotFree, printGameState};

})();


function createPlayer (name, symbol, goFirst) {
    let isMyTurn = goFirst;

    const playMove = function () {
        let slot = +prompt("Where would you like to place your move?", "");

        if (gameboard.isGameWon() === false &&
            gameboard.isSlotFree(slot) === true) {
            console.log("playing a move");
            gameboard.state[slot] = symbol;
        } else if (gameboard.isGameWon() === true) {
            console.log("NOT playing a move");
            console.log("GAME OVER");
            console.log(`${name} with symbol ${symbol} won!`);
        }
    }
    return {playMove, isMyTurn};
}


const gameFlow = (() => {

    const player1 = createPlayer("Mike", "X", true);
    const player2 = createPlayer("Luna", "O", false);
    gameboard.printGameState();

    let coinFlip;
    Math.random() < 0.5? coinFlip = true: coinFlip = false;

    const swapTurns = function () {
        player1.isMyTurn = !player1.isMyTurn;
        player2.isMyTurn = !player2.isMyTurn;
    }

    while (gameboard.isGameWon() === false) {
        player1.isMyTurn? player1.playMove(): player2.playMove();
        gameboard.printGameState();
        // draw game here
        swapTurns();
    }
})();