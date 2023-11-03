import React, { createRef } from 'react';
import classes from './search.module.css';
import { useLocation } from 'react-router-dom';

type MyProps = {
  search: (s: string) => void;
};

function Search(props: MyProps) {
  const inputRef = createRef<HTMLInputElement>();
  const location = useLocation();

  return (
    <div>
      <input
        ref={inputRef}
        className={classes.search_input}
        placeholder="Search..."
        defaultValue={
          location.search.match(/%27.*%27/)?.[0].slice(3, length - 3) || ''
        }
      ></input>
      <button
        className={classes.search_btn}
        onClick={() => props.search(inputRef.current?.value || '')}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
