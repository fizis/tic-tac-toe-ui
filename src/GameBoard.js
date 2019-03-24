import React, {Component} from 'react';
import Cookies from 'js-cookie';
import './GameBoard.css';
import ActionLog from './ActionLog';

// TODO: move this to .env file
const API_URL = 'http://localhost:3333';

// TODO: write more UTs
class GameBoard extends Component {
    constructor(props) {
        super(props);
        
        this.cookieName = 'tic_tac_toe_game_id';
        this.state = {
            id: Cookies.get(this.cookieName),
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            moves: []
        };
    }

    componentDidMount() {
        this.initGame();
    }

    initGame() {
        if (this.state.id) {
            this.loadGame();
        } else {
            this.createGame();
        }
    }

    createGame() {
        fetch(`${API_URL}/games`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    id: result.id,
                    board: result.board,
                    ended: false,
                    winner: '',
                    moves: []
                });

                Cookies.set(this.cookieName, result.id);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    
    loadGame() {
        fetch(`${API_URL}/games/${this.state.id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    // TODO: hacky solution - refactor
                    if (response.status === 404) {
                        this.createGame();
                    } else {
                        throw Error(response.statusText);
                    }
                }
            })
            .then(
                (result) => {
                    // TODO: hacky solution - refactor
                    if (result) {
                        this.setState({
                            board: result.board,
                            winner: result.winner,
                            ended: result.ended,
                            moves: result.moves
                        });

                        if (result.ended) {
                            Cookies.remove(this.cookieName);
                        }
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    makeMove(x, y) {
        console.log(`x = ${x}, y = ${y} clicked`);

        if (this.state.ended) {
            this.createGame();
            return;
        }
        
        fetch(`${API_URL}/games/${this.state.id}/moves`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                x: x,
                y: y
            })
        })
        .then(
            (result) => {
                this.loadGame();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    render() {
        const board = this.state.board.map((row, y) =>
            <div key={y} className="flex-container">
                {
                    row.map((col, x) =>
                        <div className="flex-item" key={x} onClick={() => this.makeMove(x, y)}>
                            {this.state.board[x][y]}
                        </div>
                    )
                }
            </div>
        );

        let gameEndMessage;
        let winnerMessage;

        if (this.state.ended) {
            gameEndMessage = <div className="flex-container">Game ended</div>;

            if (this.state.winner) {
                winnerMessage = <div className="flex-container">The winner is&nbsp;<strong>{this.state.winner}</strong></div>;
            } else {
                winnerMessage = <div className="flex-container">Draw</div>;
            }
        }

        let actionLog;

        if (this.state.moves.length > 0) {
            actionLog = <ActionLog moves={this.state.moves} />;
        }

        return (
            <div>
                {board}
                {gameEndMessage}
                {winnerMessage}
                {actionLog}
            </div>
        );
    }
}

export default GameBoard;