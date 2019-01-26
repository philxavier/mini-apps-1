import React from 'react';
import Row from './Row.jsx';

class App extends React.Component {
    constructor(props) {

        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.checkResults = this.checkResults.bind(this);

        this.state = {

            board:[
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
            ],

            turns: {
                player1:true
            }
        }
    }
    
    handleClick(e) {

        var target = e.target;
        var columnTarget = parseInt(target.getAttribute('data-x'));
        var coordinates = [];

        for (let i = 0; i <this.state.board.length; i++) {
            var row = this.state.board[i];
            if (row[columnTarget] !== 0) {
                coordinates.push( i - 1, columnTarget );
                break;
            } else if (i === this.state.board.length - 1) {
                coordinates.push( i, columnTarget );
                break;
            }
        }

        var row = coordinates[0];
        var column = coordinates[1];
        if (row < 0) {
            return;
        }

        var tempBoard = this.state.board.slice();
        if (this.state.turns.player1) {
            tempBoard[row][column] = 1;
            this.setState({
                board: tempBoard,
                turns:{player1: false}
            })
        } else {
            tempBoard[row][column] = 2;
            this.setState({
                board: tempBoard,
                turns:{player1: true}
            })
        }
        this.checkResults(this.state.board)
    }

    checkResults(board) {

        function checkHorizontal(arr) {
            for (let i = 0; i < arr.length; i++) {
                var row = arr[i];
                
                for (let j = 0; j < row.length - 3; j++) {
                    var container = row.slice(j, 4 + j)

                    var testFor1 = container.every((ele) => {
                        return ele === 1;
                    })
                    var testFor2 = container.every((ele) => {
                        return ele === 2;
                    })

                    if (testFor1|| testFor2) {
                       return container;
                    }
                }
            }
                        
        }
        
        function checkVertical(arr) {
            for (let j = 0; j < arr[0].length; j++) {
                
                var container = [];
                for (let i = 0; i < arr.length; i++) {
                    container.push(arr[i][j])
                }
                var testFor1 = container.every((ele) => {
                    return ele === 1;
                })
                var testFor2 = container.every((ele) => {
                    return ele === 2;
                })

                if (testFor1|| testFor2) {
                     return container;
                }
            }
        }
        
    
        function checkDiagonal(arr) {

            function getMajorDiagonal(arr) {
                for (let i = 0; i < arr[0].length; i++) {
                    var container = [];
                    container.push(arr[0][i])
                    var j = 0; 
                    var k = i;

                    while (arr[ j + 1 ] [ k - 1 ] === 0 || arr[ j + 1 ] [ k - 1 ] === 1 || arr[ j + 1 ][ k - 1 ] === 2) {

                        container.push(arr[ j + 1] [ k - 1 ])
                        j++
                        k--
                        if (arr [ j + 1 ] === undefined) {
                            break;
                        }
                    }
                    if (container.length >= 4) {
                        var testFor1 = container.every((ele) =>{
                            return ele === 1
                        })

                        var testFor2 = container.every((ele) =>{
                            return ele === 2
                        })

                        if (testFor1 || testFor2) {
                           return container;
                        }

                    }
                }
            }
            
            function getMinorDiagonal(arr) {
                for (let i = arr[0].length - 1; i >= 0; i--) {
                    var container = [];
                    container.push(arr[0][i])
                    var j = 0; 
                    var k = i;
                    while (arr[ j + 1 ] [ k + 1 ] === 0 || arr[ j + 1 ] [ k + 1 ] === 1 || arr[ j + 1 ][ k + 1 ] === 2) {
                        container.push(arr[ j + 1] [ k + 1 ])
                        j++
                        k++
                        if (arr [ j + 1 ] === undefined) {
                            break;
                        }
                    }
                    if (container.length >= 4) {
                        var testFor1 = container.every((ele) =>{
                            return ele === 1
                        })

                        var testFor2 = container.every((ele) =>{
                            return ele === 2
                        })

                        if (testFor1 || testFor2) {
                            return container
                        }
                    }
                }
                
            }

            var testDiagonal = getMajorDiagonal(arr) || getMinorDiagonal(arr)
            if (testDiagonal) {
                return testDiagonal
            }
            
        }
        var result;
        if (checkHorizontal(board)) {
            result = checkHorizontal(board)
        } else if (checkVertical(board)) {
            result = checkVertical(board)
        } else if (checkDiagonal(board)) {
            result = checkDiagonal(board);
        }

        if (result) {
            var winner;
            if (result[0] === 1) {
                winner = 'Red'
            } else {
                winner = 'Yellow'
            }
            var announcement = document.createElement('h4');
            announcement.innerHTML = `${winner} is the winner!`
            var targetElement = document.getElementsByClassName('outer-container')[0];
            targetElement.appendChild(announcement); 

            setTimeout(() => {
                var target = document.getElementsByTagName('h4');
                var targetElement = target[target.length - 1];
                targetElement.innerHTML = ' ';
                this.setState({
                board:[
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                ],
    
                turns: {
                    player1:true
                }
            })}, 500)
        }

    }


    render() {
        return (
            <div className="outer-container">            
                <h1>Connect Four</h1>
                <div className="grid-container" onClick = {(e) =>{this.handleClick(e)}}>
                    {this.state.board.map((ele, ind) => {
                        return <Row key={ind} dataY = {ind} row={this.state.board[ind]} />
                    })}
                </div>
            </div>
        )
    }
    
}


export default App;