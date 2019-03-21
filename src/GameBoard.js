import React, {Component} from 'react';
import './GameBoard.css';

class GameBoard extends Component {
    render() {
        return (
            <div>
                <div className="flex-container">
                    <div>X</div>
                    <div>O</div>
                    <div>&nbsp;</div>
                </div>
                <div className="flex-container">
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                </div>
                <div className="flex-container">
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                </div>
            </div>
        )
    }
}

export default GameBoard;