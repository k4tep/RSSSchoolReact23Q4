import React, { useEffect, useState } from 'react';
import classes from './opsyBtn.module.css';
import ErrorBoundary from '../error/error';

function OpsyBtn() {
  const [error, setError] = useState<boolean>(false);

  return (
    <ErrorBoundary>
      <button
        className={classes.error_btn}
        onClick={() => {
          setError(true);
        }}
      >
        DON'T THINK OF PRESSING THIS BUTTON
      </button>
      {error ? <ErrorComp setError={setError}></ErrorComp> : <></>}
    </ErrorBoundary>
  );
}

type MyProps = {
  setError: (params: boolean) => void;
};

function ErrorComp(props: MyProps) {
  useEffect(() => {
    props.setError(false);
    throw new Error('Oops, you clicked the wrong button');
  });
  return <h1>Im the Wrapped component with a Bug</h1>;
}

export default OpsyBtn;
