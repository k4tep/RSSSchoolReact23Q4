import React from 'react';
import classes from './btn.module.css';
import { Link } from 'react-router-dom';

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
      <Link
        className={classes.a}
        to={{
          pathname: '/posts',
          search: `?page=${props.pageNumber}`,
        }}
      >
        {props.pageNumber}
      </Link>
      {/* <a className={classes.a} href={`#page_${props.pageNumber}`}>
        {props.pageNumber}
      </a> */}
    </button>
  );
}

export default Btn;
