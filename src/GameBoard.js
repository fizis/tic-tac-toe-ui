import React, {Component} from 'react';
import './GameBoard.css';
import Tile from './Tile';

class GameBoard extends Component {
    constructor(props) {
        super(props);
        
        this.columns = [0, 1, 2]; // x coordinates
        this.rows = [0, 1, 2]; // y coordinates
    }

    render() {
        const board = this.rows.map((y) =>
            <div className="flex-container">
                {
                    this.columns.map((x) =>
                        <Tile x={x} y={y} />
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