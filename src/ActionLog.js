import React, {Component} from 'react';

class ActionLog extends Component {
    render() {
        const log = this.props.moves.map((m, i) =>
            <div key={i}>
                {m.marker} @ {m.x}:{m.y}
            </div>
        );

        return (
            <div className="flex-container">
                <div className="actions">
                    <h2>Actions:</h2>
                    {log}
                </div>
            </div>
        );
    }
}

export default ActionLog;