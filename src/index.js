import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// https://react.docschina.org/tutorial/tutorial.html#completing-the-game

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}


class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)} />;
    }

    render() {

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            history: [{squares: Array(9).fill(null)}],
            stepNumber: 0,
            xStatus: true,
        }
    };
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xStatus?'X':'0';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xStatus: !this.state.xStatus,
        })
    };

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        // let infoStatus = this.state.status?'Next player: X':'Next player: 0';
        let info;
        if (calculateWinner(current.squares)){
            info = 'Winner: ' + (this.state.xStatus?'X':'0');
        }else {
            info = 'Next player: ' + (this.state.xStatus?'X':'0');
        }
        const moves = history.map((value, index)=>{
            const desc = index?'Go to #'+index:'Go to game start';
            return (
                <li key={index}>
                    <button onClick={()=>this.jumpTo(index)}>{desc}</button>
                </li>
            );
        });
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={i=>this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{info}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    jumpTo(index) {
        this.setState({
            stepNumber: index,
            xStatus: (index % 2)===0
        });
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
