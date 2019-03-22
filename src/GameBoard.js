import React, {Component} from 'react';
import './GameBoard.css';
import Tile from './Tile';

class GameBoard extends Component {
    constructor(props) {
        super(props);
        
        this.id = 'test_id'; // TODO: temporary hardcoded
        this.columns = [0, 1, 2]; // x coordinates
        this.rows = [0, 1, 2]; // y coordinates
        this.state = {
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ]
        };

        this.loadBoard = this.loadBoard.bind(this);
    }

    componentDidMount() {
        this.loadBoard();
    }

    loadBoard() {
        // use configuration for URL
        // TODO: use real ID
        fetch('http://localhost:3333/games/test_id')
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    this.setState({
                        board: result.board
                    });
                },
                (error) => {
                    console.log(error); // TODO: handle error
                }
            )
    }

    render() {
        const board = this.rows.map((y) =>
            <div className="flex-container">
                {
                    this.columns.map((x) =>
                        // TODO: add key property
                        <Tile x={x} y={y} marker={this.state.board[x][y]} updateBoard={this.loadBoard} />
                    )
                }
            </div>
        );

        return (
          <div>{board}</div>
        );
    }
}

export default GameBoard;