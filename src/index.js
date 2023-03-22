import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
    return (
        <button className={props.activ} onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={i}
                activ={this.props.btnActiv[i]}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        let rows = []
        for (let i = 0; i < 3; i++) {
            let squares = []
            for (let j = 0; j < 3; j++) {
                const index = i * 3 + j;
                squares.push(this.renderSquare(index))
            }
            rows.push(<div key={i} className="board-row">{squares}</div>);
        }

        return <div>{rows}</div>;
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array_positon: [
                [1, 1], [2, 1], [3, 1],
                [1, 2], [2, 2], [3, 2],
                [1, 3], [2, 3], [3, 3]
            ],
            history: [{
                squares: Array(9).fill(null),
                position: [],
                btnActiv: Array(9).fill("square"),
                winner: null,
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        let btnActiv = current.btnActiv;

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        btnActiv = Array(9).fill("square");
        btnActiv[i] = "square activ";

        let winner = calculateWinner(squares);
        if (winner) {
            winner.lines.forEach((lineIndex) => {
                btnActiv[lineIndex] = "square winner"
            });
        }

        this.setState({
            history: history.concat([{
                squares: squares,
                position: this.state.array_positon[i],
                btnActiv: btnActiv,
                winner: winner,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = current.winner;


        const moves = history.map((step, move) => {
            const desc = move ?
                'Перейти к ходу #' + move + `   [ ${step.position[0]} , ${step.position[1]} ] ` :
                'К началу игры';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        const reverseMoves = moves.slice().reverse();
        const toggleOrderBtn = (
            <button onClick={() => this.setState({ reverseOrder: !this.state.reverseOrder })}>
                {this.state.reverseOrder ? 'Показать по порядку' : 'Показать в обратном порядке'}
            </button>
        );
        const orderedMoves = this.state.reverseOrder ? reverseMoves : moves;

        let status;
        if (winner) {
            status = 'Выйграл ' + winner.winner;
        }
        else if(current.squares.every((square) => square !== null)){
            status = 'Ничья'
        }
        else {
            status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        btnActiv={current.btnActiv}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    {toggleOrderBtn}
                    <ol>{orderedMoves}</ol>
                </div>

            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

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
            return {
                winner: squares[a],
                lines: lines[i],
            };
        }
    }

    return null;
}