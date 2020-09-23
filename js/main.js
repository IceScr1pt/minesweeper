
// gBoard – A Matrix containing cell objects: 
// Each cell: 
// {     minesAroundCount: 4,     isShown: true,     isMine: false,     isMarked: true     } 


'use strict';

const MINE = '💣';
const EMPTY = '';
const FLAG = '🏁';
var gTime;
var gMinePoses;

var gGame;
// var gGame = {
//     isOn: false,
//     showCount: 0,
//     markedCount: 0,
//     secsPassed: 0
// }
var gBoard;

var gStartTimer;
var gTimerInterval;

var gLevel = {
    size: 4,
    mines: 2
};





function pickMode(size) {
    switch (size) {
        case 4:
            gLevel.size = 4;
            gLevel.mines = 2;
            init();
            break;
        case 8:
            gLevel.size = 8;
            gLevel.mines = 12;
            init();
            break;
        case 12:
            gLevel.size = 12
            gLevel.mines = 30
            init();
            break;

    }
}



//handle game init
function init() {
    gMinePoses = [];
    gBoard = createBoard();
    gStartTimer = 0;
    gGame = {
        isOn: false,
        showCount: 0,
        markedCount: 0,
        secsPassed: 0,
        isWon: false
    }
    //control restart ui
    if (!gGame.isOn) {
        var elTimerSpan = document.querySelector('.time');
        elTimerSpan.innerText = 'Click to start'
        removeBubble();

    }

    gGame.isOn = true;
    console.log(gBoard)

    //render board

    renderBoard(gBoard);
    // gStartTimer = Date.now();

    //START GAME
    // gGame.isOn = true;
}


//create the matrix
function createBoard() {
    var board = [];
    //board size
    var boardSize = gLevel.size;
    //board mines
    var numMines = gLevel.mines;
    for (var i = 0; i < boardSize; i++) {
        board[i] = [];
        for (var j = 0; j < boardSize; j++) {
            //create a cell obj for each pos
            board[i][j] = createCell();



            // if (i === 2 && j === 1 || i === 0 && j === 2) {
            //     // board[i][j] = MINE;
            //     board[i][j].isMine = true;
            // }
        }
    }

    //place rand mines
    console.table(board)
    for (var i = 0; i < numMines; i++) {
        placeMine(board);
    }
    return board;
}





function placeMine(board) {
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            if (!currCell.isMine) {
                console.log('true')
                emptyCells.push({ i, j });
            }
        }
    }
    console.log('empty cells', emptyCells)
    var randIdx = getRandomInteger(0, emptyCells.length - 1);
    var randCell = emptyCells[randIdx];
    gMinePoses.push(randCell)
    console.log('RAND CELL SELCETED FOR BOMB', randCell)
    board[randCell.i][randCell.j].isMine = true;
}



function revealMines() {
    var count = 0;
    for (var i = 0; i < gMinePoses.length; i++) {
        var currMineCoords = gMinePoses[i];
        count++;
        console.log('curr mine coords', currMineCoords)
        var elCell = document.querySelector(`.cell-${currMineCoords.i}-${currMineCoords.j}`);
        if (count === 1) {
            elCell.style.backgroundColor = 'red';
        } else {
            elCell.style.backgroundColor = 'white';
        }
        elCell.innerHTML = MINE;

        // renderCell(currMineCoords, MINE)
    }
}


function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    // if (reveal) elCell.classList.add('show');
    console.log('cell elem:', elCell)
    elCell.innerHTML = value;
}





// Create setMinesNegsCount() and store the numbers (isShown is still true) 
// Count mines around each cell and set the cell's minesAroundCount
function setMinesNegsCount(board, rowIdx, colIdx) {
    console.log(rowIdx, colIdx)
    var minesCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        // console.log('ENTERED FIRST LOOP')
        //if i am on the edge of the
        if (i < 0 || i >= board.length) continue;
        // console.log('Passed first check');
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // console.log('ENTERED SECOND LOOP');
            if (j < 0 || j >= board.length) continue;
            // console.log('PASSED SECOND CHECK')
            //if im on the cell i clicked i dont want to check it
            if (i === rowIdx && colIdx === j) continue;
            // console.log('PASSED FINAL CHECK');
            // console.log('CHECKING CELL POS:', i, j)
            var cell = board[i][j]
            // console.log('CELL CONTENTS:', cell)
            if (cell.isMine) {
                // console.log('A MINE IS NEAR ME')
                minesCount += 1;
                // board[i][j].minesAroundCell = minesCount;
                // console.log('CELL AFTER INCREMENT MINES COUNT:', cell)
            }
        }
    }
    return minesCount;
}







function renderBoard(board) {
    var elBoard = document.querySelector('.board');
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < board.length; j++) {
            var cellClass = getClassName({ i, j });
            // var cellNegs = setMinesNegsCount(board, i, j)
            //DECIDE CELL CONTENT
            var cellContent = board[i][j];


            // var cellContent = (cellContent.isMine) ? MINE : EMPTY;

            /*****UNCOMMENT THIS******/
            var cellContent = EMPTY;


            // if (cellContent.isMine) {
            //     cellContent = MINE;
            // } else if (cellNegs) {
            //     cellContent.minesAroundCell = cellNegs;
            //     cellContent = cellNegs;
            // } else {
            //     cellContent = EMPTY;
            // }

            // if (cellContent.isMine) {
            //     //check about this
            //     // cellContent.minesAroundCell = 0;
            //     cellContent = MINE;
            //     //maybe set amount of cell to 0 if its a mine
            // } else if (cellNegs) {
            //     cellContent.minesAroundCell = cellNegs;
            //     //show in dom
            // cellContent = cellNegs;

            // } else {
            //     cellContent = EMPTY;
            // }


            // console.log('cell negs:', cellNegs)
            strHTML += `<td onclick="cellClicked(this)" oncontextmenu="cellClickedFlag(event)" class="${cellClass}">${cellContent}</td>`;
        }
        strHTML += `</tr>`
    }

    elBoard.innerHTML = strHTML;
}





function cellClickedFlag(ev) {
    console.log(ev)
    ev.preventDefault();
    if (!gGame.isOn) return;

    startTimer();

    //prevent deafult behavior of right click


    var elCell = ev.target;
    var cellCoords = getCellCoord(ev.target.className);
    var cellSelected = gBoard[cellCoords.i][cellCoords.j]
    console.log(cellSelected)

    if (cellSelected.isMarked) {
        cellSelected.isMarked = false;
        gGame.markedCount--;
        renderCell(cellCoords, EMPTY)
        // elCell.innerHTML = EMPTY;
    } else {
        cellSelected.isMarked = true;
        gGame.markedCount++;
        // elCell.innerHTML = FLAG;
        renderCell(cellCoords, FLAG)
    }





}



// LOSE: when clicking a mine, all mines should be revealed 


function cellClicked(elCell) {
    var cellCoords = getCellCoord(elCell.className);
    var selectedCell = gBoard[cellCoords.i][cellCoords.j];
    var cellNegs = setMinesNegsCount(gBoard, cellCoords.i, cellCoords.j);
    console.log(selectedCell)
    //run it evrey 10 milisec

    if (!gGame.isOn) return;

    startTimer();
    // if (!gTimerInterval) {
    //     startTimer();
    // }



    if (isVictory()) {
        gGame.isWon = true;
        // alert('YOU WON!');
        gameOver();
        return;
    }


    //if the cell is showen or marked i dont continue
    if (selectedCell.isShowen || selectedCell.isMarked) return;
    elCell.classList.add('show');
    gBoard[cellCoords.i][cellCoords.j].isShowen = true;
    gGame.showCount++;

    if (selectedCell.isMine) {
        elCell.innerHTML = MINE;
        elCell.style.backgroundColor = 'red';
        // elCell.style.backgroundColor = 'white';
        gameOver();

    } else if (cellNegs) {
        gBoard[cellCoords.i][cellCoords.j].minesAroundCell = cellNegs;
        elCell.innerHTML = cellNegs;
    } else {
        elCell.innerHTML = EMPTY;

    }




    console.log(`CELL COORDS ${cellCoords.i},${cellCoords.j} is showen!`)
    console.log('CLICKED ON CELL:', cellCoords);
}




// WIN: all the mines are flagged, and all the other cells are shown 
function isVictory() {
    return gGame.showCount + gGame.markedCount === gBoard.length ** 2;
    // if (gGame.showCount + gGame.markedCount === gBoard.length ** 2) {
    //     alert('YOU WON!!!');
    // }
}


function gameOver() {
    gGame.isOn = false;
    var elBubbleSpan = document.querySelector('.bubble-span');
    showBubble()
    revealMines();
    console.log('GAME OVER!')
    if (gGame.isWon) {
        elBubbleSpan.innerHTML = 'YOU WON!';
    } else {
        elBubbleSpan.innerHTML = 'GAME OVER!';
    }
    clearInterval(gTimerInterval);

    console.log('cleared interval')


}


function calcTime() {
    var elSpanTimer = document.querySelector('.time')
    var now = Date.now();
    var diff = (now - gStartTimer) / 1000;
    gGame.secsPassed = Math.floor(diff);
    var time = formatTimestamp(diff);
    elSpanTimer.innerText = time;

}



function startTimer() {
    if (!gTimerInterval) {
        gStartTimer = Date.now();
        gTimerInterval = setInterval(calcTime, 10);
        console.log('created interval:', gTimerInterval)
    } else {
        clearInterval(gTimerInterval)
    }


}


function showBubble() {
    var elBubble = document.querySelector('.bubble');
    elBubble.style.display = 'block';
}

function removeBubble() {
    var elBubble = document.querySelector('.bubble');
    elBubble.style.display = 'none';
}




//create cell objects
function createCell() {
    var cell = {
        minesAroundCell: 0,
        isShowen: false,
        isMine: false,
        isMarked: false
    }
    return cell;
}



function getClassName(location) {
    var cellClass = `cell-${location.i}-${location.j}`
    return cellClass;
}


function getCellCoord(strClassName) {
    var parts = strClassName.split('-');
    console.log('parts', parts)
    var coord = {
        i: +parts[1],
        j: +parts[2],
    };
    return coord;
}



// function startTimer() {
//     if (!gGame.isOn) {
//         console.log('got to hererrerererre')
//         gGame.isOn = true;
//     } else {
//         return;
//     }
//     gStartTimer = Date.now();
//     gTimerInterval = setInterval(calcTime, 10);

// }



// function placeMines(numMines,board) {
//     for(var i =0; i< numMines; i++) {
//         placeMine(board)
//     }
// }


//check negs algo
// if (i === 2 && j === 1 || i === 0 && j === 2 || i === 2 && j === 2 || i == 2 && j === 0 || j === 0 && i === 0 || i === 1 && j === 2 || i === 1 & j === 0 || i === 0 & j === 1) {
//     // board[i][j] = MINE;
//     board[i][j].isMine = true;
// }function createBoard(gLevel) {
//     var board = [];
//     var boardSize = gLevel.size;
//     for (var i = 0; i < boardSize; i++) {
//         board[i] = [];
//         for (var j = 0; j < boardSize; j++) {
//             //create a cell obj for each pos
//             board[i][j] = createCell();
//             if (board[i][j].isMine) {
//                 board[i][j].minesAroundCell += 1;
//             }

//             // if (i === 2 && j === 1 || i === 0 && j === 2) {
//             //     // board[i][j] = MINE;
//             //     board[i][j].isMine = true;
//             // }
//         }
//     }

//     board[2][1].isMine = true;
//     board[0][2].isMine = true;
//     console.table(board)
//     return board;
// }
// function runGeneration(board) {
//     var copyBoard = [];
//     for (var i = 0; i < board.length; i++) {
//         copyBoard[i] = board[i].slice()
//     }

//     for (i = 0; i < board.length; i++) {
//         //copy each row from the passed in board
//         var row = copyBoard[i];
//         for (var j = 0; j < row.length; j++) {
//             var cellNegs = countLivingNegs(board, i, j);
//             // console.log(cellNegs)
//             if (cellNegs <= 2) {
//                 console.log('should be dead')
//                 copyBoard[i][j] = EMPTY_CELL;
//             } else if (cellNegs <= 5) {
//                 console.log('should be alive')
//                 copyBoard[i][j] = LIVING_CREATURE;
//             } else {
//                 copyBoard[i][j] = EMPTY_CELL;
//             }
//         }

//     }
//     return copyBoard;

// }









































//WORKING RENDER BOARD THAT SHOW FROM THE BEGINNING THE NUMBERS
// function renderBoard(board) {
//     var elBoard = document.querySelector('.board');
//     var strHTML = '';
//     for (var i = 0; i < board.length; i++) {
//         strHTML += `<tr>`;
//         for (var j = 0; j < board.length; j++) {
//             var cellClass = getClassName({ i, j });
//             var cellNegs = setMinesNegsCount(board, i, j)
//             //DECIDE CELL CONTENT
//             var cellContent = board[i][j];
//             if (cellContent.isMine) {
//                 //check about this
//                 // cellContent.minesAroundCell = 0;
//                 cellContent = MINE;
//                 //maybe set amount of cell to 0 if its a mine
//             } else if (cellNegs) {
//                 cellContent.minesAroundCell = cellNegs;
//                 //show in dom
//                 cellContent = cellNegs;

//             } else {
//                 cellContent = EMPTY;
//             }


//             console.log('cell negs:', cellNegs)
//             strHTML += `<td onclick="cellClicked(this)" class="${cellClass}">${cellContent}</td>`;
//         }
//         strHTML += `</tr>`
//     }

//     elBoard.innerHTML = strHTML;
// }
