// #region  H E A D E R
// <copyright file="TicTacToe.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MITxPRO Tic-Tac-Toe
 *      Module:   Modules (./TicTacToe.js)
 *      Project:  MicroCODE Common Library
 *      Customer: Internal
 *      Creator:  MicroCODE Incorporated
 *      Date:     May 2022
 *      Author:   Timothy J McGuire
 *
 *      Designed and Coded: 2022 MicroCODE Incorporated
 *
 *      This software and related materials are the property of
 *      MicroCODE Incorporated and contain confidential and proprietary
 *      information. This software and related materials shall not be
 *      duplicated, disclosed to others, or used in any way without the
 *      written of MicroCODE Incorported.
 *
 *
 *      DESCRIPTION:
 *      ------------
 *
 *      This module implements a Tic-Tac-Toe Game.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MIT xPRO Style Guide
 *         https://student.emeritus.org/courses/3291/files/2554233/download?wrap=1
 *
 *      2. AirBnB JavaScript Style Guide
 *         https://github.com/airbnb/javascript
 *
 *      3. Turing School Style Guide
 *         https://github.com/turingschool-examples/javascript/tree/main/es5
 *
 *      4. MDN Web Docs - JavaScript Classes
 *         https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
 *
 *      5. JSDoc - How to properly document JavaScript Code.
 *         https://
 *
 *      6. MicroCODE JavaScript Style Guide
 *         Local File: MCX-S02 (Internal JS Style Guide).docx
 *         https://github.com/MicroCODEIncorporated/JavaScriptSG
 *
 *
 *      DEMONSTRATION VIDEOS:
 *      --------------------
 *
 *      1. ...
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:     Description:
 *
 *  24-May-2022   TJM-MCODE  {0001}    New module for a Tic-Tac-Toe App.
 *
 *
 */
"use strict";

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S

// Checking for Winner takes a bit of work
// We use JavaScript Sets to check players choices
// against winning combinations
// Online there is more compact version but I prefer this one

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 5, 6],
];

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  M E T H O D S – P U B L I C

/**
 * Game() – the PARENT Component of the Tic-Tac-Toe game.
 *
 * @api public
 *
 * @returns a JSX div representing the Game filled with a Board.
 *
 * @example
 *
 *      <div className="game">
 *           <Board></Board>
 *      </div>
 *
*/
const Game = () =>
{
    return (
        <div className="game">
            <Board></Board>
        </div>
    );
};

/**
 * Board() – a CHILD Component of the Game Component.
 *
 * @api public
 *
 * @returns a JSX div representing the Board filled with Squares.
 *
 * @example
 *
 *      <div className="game">
 *           <Board></Board>
 *      </div>
 *
 */
const Board = () =>
{
    // 1st player is X ie 1
    // State keeps track of next player and gameState
    const [player, setPlayer] = React.useState(1);
    const [gameState, setGameState] = React.useState([]);

    let playerName = (player == 1) ? "Player X" : "Player O";

    // check for winner
    let next = `Next Player: ${playerName}`;
    let status = `Winner is ${checkForWinner(gameState)}`;

    console.log(`We have a winner ${status}`);

    const takeTurn = (id) =>
    {
        setGameState([...gameState, {id: id, player: player}]);
        setPlayer((player + 1) % 2); // get next player
        return player;
    };

    function renderSquare(i)
    {
        // use properties to pass callback function takeTurn to Child
        return <Square takeTurn={takeTurn} id={i}></Square>;
    }

    return (
        <div className="game-board">
            <div className="grid-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="grid-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="grid-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <div id="info">
                <h1>{next}</h1>
                <h1>{status}</h1>
            </div>
        </div>
    );
};

/**
 * Square() – a CHILD Component of the Board Component.
 *            notice properties from PARENT takeTurn and id are being passed in by extraction from 'props'.
 *
 * @api public
 *
 * @param {method} takeTurn method to change players.
 * @param {number} id a unique id number for this Square.
 * @returns a JSX button representing a Board Square.
 *
 * @example
 *
 *      <Square takeTurn={takeTurn} id={i}></Square>;
 *
 */
const Square = ({takeTurn, id}) =>
{
    const mark = ["O", "X", " "];

    // id is the square's number
    // filled tells us if square has been filled
    // tik tells us symbol in square (same as player)
    // We call takeTurn to tell Parent we have filled the square
    const [filled, setFilled] = React.useState(false);
    const [tik, setTik] = React.useState(2);

    return (
        <button
            onClick={() =>
            {
                setTik(takeTurn(id));
                setFilled(true);
                console.log(`Square: ${id} filled by player : ${tik}`);
            }}
        >
            <h1 class={(tik == 0) ? "cyan" : (tik == 1) ? "lime" : "black"}>{mark[tik]}</h1>
        </button>
    );
};

// #endregion

// #region  M E T H O D S – P R I V A T E

const checkForWinner = (gameState) =>
{
    // get array of box id's
    // can't be a winner in less than 5 turns
    if (gameState.length < 5) return "No Winner Yet";
    let p0 = gameState.filter((item) =>
    {
        if (item.player == 0) return item;
    });
    p0 = p0.map((item) => item.id);
    let px = gameState.filter((item) =>
    {
        if (item.player == 1) return item;
    });
    px = px.map((item) => item.id);
    if (p0 != null && px != null)
    {
        var win0 = win.filter((item) =>
        {
            return isSuperset(new Set(p0), new Set(item));
        });
        var winX = win.filter((item) =>
        {
            return isSuperset(new Set(px), new Set(item));
        });
    }
    if (win0.length > 0) return "Player O ";
    else if (winX.length > 0) return "Player X ";
    return "No Winner Yet";
};

// check if subset is in the set
function isSuperset(set, subset)
{
    for (let elem of subset)
    {
        if (!set.has(elem))
        {
            return false;
        }
    }
    return true;
}


// #endregion

// #region  M E T H O D - E X P O R T S

// #endregion

// #region  R E A C T

ReactDOM.render(<Game />, document.getElementById("root"));

// #endregion

// #endregion
// #endregion