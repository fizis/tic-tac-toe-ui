import React, {Component} from 'react';

class Tile extends Component {
    constructor(props) {
        super(props);
        
        console.log(`Tile: x = ${props.x}, y = ${props.y}, value = ${props.value}`);

        this.makeMove = this.makeMove.bind(this);
    }
      
    makeMove(e) {
        e.preventDefault();
        console.log(`${this.props.x}, ${this.props.y} clicked`);
    }
    
    render() {
        return (
            <div onClick={(e) => this.makeMove(e)}>{this.props.value}</div>
        )
    }
}

export default Tile;