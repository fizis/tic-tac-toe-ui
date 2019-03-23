import React, {Component} from 'react';

class Tile extends Component {
    constructor(props) {
        super(props);

        this.makeMove = this.makeMove.bind(this);
    }
      
    makeMove(e) {
        e.preventDefault();
        console.log(`${this.props.x}, ${this.props.y} clicked`);
        
        // use configuration for URL
        fetch(`http://localhost:3333/games/${this.props.id}/moves`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                x: this.props.x,
                y: this.props.y
            })
        })
        .then(
            (result) => {
                // TODO: we could use the returned result to update only this tile instead (entire board won't be reloaded then)
                // but we need to implement action log as well, so we'll need to update GameBoard still.
                this.props.updateBoard();
            },
            (error) => {
                console.log(error);
            }
        );
    }
    
    render() {
        // console.log(`Tile: x = ${this.props.x}, y = ${this.props.y}, marker = '${this.props.marker}'`);
        return (
            <div onClick={(e) => this.makeMove(e)}>{this.props.marker}</div>
        )
    }
}

export default Tile;