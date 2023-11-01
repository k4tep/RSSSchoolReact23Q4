import React from 'react';
import classes from './opsyBtn.module.css';
import ErrorBoundary from '../error/error';

class OpsyBtn extends React.Component {
  state = {
    error: false,
  };

  render() {
    return (
      <ErrorBoundary>
        <button
          className={classes.error_btn}
          onClick={() => {
            this.setState({ error: true });
          }}
        >
          DON'T THINK OF PRESSING THIS BUTTON
        </button>
        {this.state.error ? <Error></Error> : <></>}
      </ErrorBoundary>
    );
  }
}

class Error extends React.Component {
  componentDidMount() {
    this.setState({ error: false });
    throw new Error('Oops, you clicked the wrong button');
  }

  render() {
    return <h1>Im the Wrapped component with a Bug</h1>;
  }
}

export default OpsyBtn;
