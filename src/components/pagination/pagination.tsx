import React from 'react';
import paginationLine from '../../utils/pagination';
import Btn from '../btn/btn';
import classes from './pagination.module.css';

type MyProps = {
  countOfPages: number;
  currPage: number;
  newCurrPage: (e: number) => void;
};

function Pagination(props: MyProps) {
  const test = (params: number) => {
    props.newCurrPage(params);
  };

  return (
    <div className={classes.pagination_container}>
      {paginationLine(props.countOfPages).map((e) => (
        <Btn
          key={e}
          func={test}
          pageNumber={e}
          active={props.currPage === e}
        ></Btn>
      ))}
    </div>
  );
}

export default Pagination;
