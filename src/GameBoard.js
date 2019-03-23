import React, {Component} from 'react';
import Cookies from 'js-cookie';
import './GameBoard.css';
import ActionLog from './ActionLog';

class GameBoard extends Component {
    constructor(props) {
        super(props);
        
        // TODO: get rid of these two vars
        this.columns = [0, 1, 2]; // x coordinates
        this.rows = [0, 1, 2]; // y coordinates
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

        this.loadGame = this.loadGame.bind(this);
    }

    componentDidMount() {
        this.initGame();
    }

    initGame() {
        if (typeof this.state.id === 'undefined') {
            this.createGame();
        } else {
            this.loadGame();
        }
    }

    createGame() {
        // TODO: use configuration for URL
        fetch('http://localhost:3333/games', {
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
                console.log(error); // TODO: handle error
            }
        );
    }
    
    loadGame() {
        // TODO: use configuration for URL
        fetch(`http://localhost:3333/games/${this.state.id}`)
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
                    if (typeof result !== 'undefined') {
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
                    console.log(error); // TODO: handle error
                }
            )
    }

    makeMove(x, y) {
        console.log(`${x}, ${y} clicked`);

        if (this.state.ended) {
            this.createGame();
            return;
        }
        
        // TODO: use configuration for URL
        fetch(`http://localhost:3333/games/${this.state.id}/moves`, {
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
                // TODO: we could use the returned result to update only this tile instead (entire board won't be reloaded then)
                // but we need to implement action log as well, so we'll need to update GameBoard still.
                this.loadGame();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    render() {
        const board = this.rows.map((y) =>
            <div key={y} className="flex-container">
                {
                    this.columns.map((x) =>
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