import React from 'react';
import classes from './opsyBtn.module.css';

class OpsyBtn extends React.Component {
  state = {
    error: false,
  };

  render() {
    return (
      <>
        <button
          className={classes.error_btn}
          onClick={() => {
            this.setState({ error: true });
          }}
        >
          DON'T THINK OF PRESSING THIS BUTTON
        </button>
        {this.state.error ? <Error></Error> : <></>}
      </>
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
