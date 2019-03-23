import React, {Component} from 'react';
import Cookies from 'js-cookie';
import './GameBoard.css';
import Tile from './Tile';

class GameBoard extends Component {
    constructor(props) {
        super(props);
        
        this.columns = [0, 1, 2]; // x coordinates
        this.rows = [0, 1, 2]; // y coordinates
        this.cookieName = 'tic_tac_toe_game_id';
        this.state = {
            id: Cookies.get(this.cookieName),
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ]
        };

        this.loadGame = this.loadGame.bind(this);
    }

    componentDidMount() {
        this.initGame();
    }

    initGame() {
        console.log(this.state.id);

        if (typeof this.state.id === 'undefined') {
            this.createGame();
        } else {
            this.loadGame();
        }

        console.log(this.state.id);
    }

    createGame() {
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
                console.log(result);
                this.setState({
                    id: result.id,
                    board: result.board
                });

                console.log(this.state);

                Cookies.set(this.cookieName, result.id);
            },
            (error) => {
                console.log(error); // TODO: handle error
            }
        );
    }

    // TODO: handle empty response error when game is not created yet: "SyntaxError: Unexpected end of JSON input"
    loadGame() {
        // use configuration for URL
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
                    // console.log(result);
                    // TODO: hacky solution - refactor
                    if (typeof result !== 'undefined') {
                        this.setState({
                            board: result.board,
                            winner: result.winner,
                            ended: result.ended
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

    render() {
        const board = this.rows.map((y) =>
            <div key={y} className="flex-container">
                {
                    this.columns.map((x) =>
                        <Tile key={x} id={this.state.id} x={x} y={y} marker={this.state.board[x][y]} updateBoard={this.loadGame} />
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

        return (
            <div>
                {board}
                {gameEndMessage}
                {winnerMessage}
            </div>
        );
    }
}

export default GameBoard;