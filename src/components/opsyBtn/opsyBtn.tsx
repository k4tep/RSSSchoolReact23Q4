import React from 'react';
import classes from './opsyBtn.module.css';
import ErrorBoundary from '../error/error';

class OpsyBtn extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <button
          className={classes.error_btn}
          onClick={() => {
            localStorage.setItem('error', 'true');
          }}
        >
          DON'T THINK OF PRESSING THIS BUTTON
        </button>
        {localStorage.getItem('error') ? <Error></Error> : <></>}
      </ErrorBoundary>
    );
  }
}

class Error extends React.Component {
  componentDidMount() {
    localStorage.removeItem('error');
    throw new Error('Oops, you clicked the wrong button');
  }

  render() {
    return <h1>Im the Wrapped component with a Bug</h1>;
  }
}

export default OpsyBtn;
