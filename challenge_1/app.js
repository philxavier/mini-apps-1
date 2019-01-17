//============================Main Variables================
var winner;
var controlAddSymbol = 0;
var controlFillData = 0; 
var xWins = 0;
var oWins = 0;
var playerX = prompt('Insert name of player one')
var playerO = prompt('Insert name of player two')



var gameData = [[0,0,0],
                [0,0,0], 
                [0,0,0]]


var table = document.getElementById('table');

//====add simble to quadrant ======================

var addSymbol = function(lastWinner, ele) {
    var x = 'X';
    var o = 'O';

    if (!lastWinner) {
        if (controlAddSymbol % 2 === 0) {
            ele.innerHTML = x;
        } else {
            ele.innerHTML = o;
        }
        controlAddSymbol++;
    } else {
        if (lastWinner === 1) {
            if (controlAddSymbol % 2 === 0) {
                ele.innerHTML = x;
            } else {
                ele.innerHTML = o;
            }
            controlAddSymbol++;
        } else {
            if (controlAddSymbol % 2 === 0) {
                ele.innerHTML = o;
            } else {
                ele.innerHTML = x;
            }
            controlAddSymbol++;
        }
    }
    
}

var insertNames = function() {
    var divPlayerOne = document.getElementById('div_player_one');
    var divPlayerTwo = document.getElementById('div_player_two');
    divPlayerOne.prepend(playerX);
    divPlayerTwo.prepend(playerO);
}


var updateScore = function() {
    var xScore = document.getElementById('scoreOfX');
    var oScore = document.getElementById('scoreOfO');
    xScore.innerHTML = xWins;
    oScore.innerHTML = oWins;
}

insertNames();
updateScore();

//=====grab which quadrant is clicked========= 
table.addEventListener('click', function(event){
    var spot = event.target;
 
    if (spot.classList.contains('col') && !spot.innerHTML) {
        addSymbol(winner, spot);
        fillData(winner, spot);
    }
    
    if (checkGamedata(gameData, 1, 2)) {
        //debugger;
        setTimeout(function(){alert('GAME OVER!')}, 50);  
        setTimeout(function(){ clearHtml() }, 100);  ;        
        resetGameData();
        controlAddSymbol = 0;
        controlFillData = 0;
    }

    if (checkIfFullBoard(gameData)) {
        setTimeout(function(){alert("IT'S A TIE!!")}, 50);  
        setTimeout(function(){ clearHtml() }, 100);  ;        
        resetGameData();
        controlAddSymbol = 0;
        controlFillData = 0;
    }

    updateScore()
    
})


//========fill array with data==============
var fillData = function(lastWinner, ele) {    
    var target = ele.id;
    
    var dictionary = {
        a: 0,
        b: 1,
        c: 2
    };
    
    var row = dictionary[target[0]];
    var col = target[1];
    
    if (!lastWinner) {
        if (controlFillData % 2 === 0) {
            gameData[row][col] = 1;
        } else {
            gameData[row][col] = 2;
        }
        controlFillData ++;
    } else {
        if (lastWinner === 1) {
            if (controlFillData % 2 === 0) {
                gameData[row][col] = 1;
            } else {
                gameData[row][col] = 2;
            }
            controlFillData ++;
        } else {
            if (controlFillData % 2 === 0) {
                gameData[row][col] = 2;
            } else {
                gameData[row][col] = 1;
            }
            controlFillData++;
        };
    };
};

var clearHtml = function() {
    var targets = document.getElementsByClassName('col');
    for (let i = 0; i < targets.length; i++) {
        targets[i].innerHTML = '';
    }
}


var checkIfFullBoard = function(arr) {
  var flattened = [].concat(arr[0], arr[1], arr[2]);
  var test =  flattened.every(function(ele){ return ele !== 0});
  if (test) {
     return true;
  } 
}

var checkAllColumns = function(arr, num) {
    var k = 0;
    while (k < arr.length) {
        var column = [];
        for (let i = 0; i < arr.length; i++) {
            var element = arr[i][k];
            column.push(element);
        }
        var test = column.filter(function(ele) {
            return ele === num;
        })
        if (test.length === 3) {
            winner = test[0];
            if (winner === 1) {
                xWins ++;
            } else {
                oWins ++;
            }
            return true;
        }
        k++;
    }
    return false;
}


var checkAllRows = function(input, num) {
    for (let i = 0; i <input.length; i++) {
        var row = input[i];
        var test = row.filter(function(ele) {
            return ele === num;
        })
        if (test.length === 3) {
            winner = test[0];
            if (winner === 1) {
                xWins ++;
            } else {
                oWins ++;
            }
            return true;
        }
    }
    return false;
}

var checkDiagonals = function(input, num) {
    
    var diag1 = [].concat(input[0][0], input[1][1], input[2][2]);

    var diag2 = [].concat(input[0][2], input[1][1], input[2][0]);
    
    var testDiag1 = diag1.filter(function(ele) {return ele === num;});

    var testDiag2 = diag2.filter(function(ele) {return ele === num;});
    
    if (testDiag1.length === 3 || testDiag2.length === 3) {
        
        if (testDiag1.length === 3) {
            winner = testDiag1[0];
            if (winner === 1) {
                xWins ++;
            } else {
                oWins ++;
            }
        } else {
            winner = testDiag2[0];
            if (winner === 1) {
                xWins ++;
            } else {
                oWins ++;
            }
        }

        return true;
    } 
    return false;
}


var checkGamedata = function(arr, symbol1, symbol2) {
    if (checkAllColumns(arr, symbol1) || 
        checkAllColumns(arr, symbol2) ||
        checkAllRows(arr, symbol1) ||
        checkAllRows(arr, symbol2) ||
        checkDiagonals(arr, symbol1) ||
        checkDiagonals(arr, symbol2)
    ) { 
        return true;
    } 
}

var resetGameData = function() {
    gameData = [];
    gameData.push([0,0,0], [0,0,0], [0,0,0]);
}


