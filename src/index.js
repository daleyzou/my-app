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
    constructor(props) {
        super(props);
        this.state={
            xIs: true,
            currMsg: null,
            squares: Array(9).fill(null),
        }
    };



    renderSquare(i) {
        let squares = this.state.squares.slice();
        squares[i] = this.state.xIs?'X':'0';
        return <Square value={this.state.squares[i]} onClick={()=>this.handleClick(i, squares)} />;
    }

    render() {
        let status;
        if (this.state.xIs){
            status = 'Next player: X';
        }else {
            status = 'Next player: 0';
        }

        return (
            <div>
                <div className="status">{status}</div>
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

    handleClick(i, squares) {
        this.setState({squares: squares, xIs: !this.state.xIs})
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
