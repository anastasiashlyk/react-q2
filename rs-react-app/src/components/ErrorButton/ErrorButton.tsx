import React from 'react';
import './index.css';

interface State {
  shouldThrow: boolean;
}

class ErrorButton extends React.Component<object, State> {
  state: State = {
    shouldThrow: false,
  };

  handleClick = () => {
    this.setState({ shouldThrow: true });
  };
  render() {
    if (this.state.shouldThrow) {
      throw new Error('...');
    }
    return (
      <button onClick={this.handleClick} className="error-button">
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
