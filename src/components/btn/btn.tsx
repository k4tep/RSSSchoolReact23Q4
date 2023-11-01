import React from 'react';
import classes from './btn.module.css';

type MyProps = {
  func: (params: number) => void;
  pageNumber: number;
  active: boolean;
};

function Btn(props: MyProps) {
  return (
    <button
      className={classes.btn}
      onClick={() => {
        props.func(props.pageNumber);
      }}
      disabled={props.active}
    >
      {props.pageNumber}
    </button>
  );
}

export default Btn;
