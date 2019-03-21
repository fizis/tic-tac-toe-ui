import React, { Component } from 'react';
import './App.css';

class App extends Component {
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
    );
  }
}

export default App;
