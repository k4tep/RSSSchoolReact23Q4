import React, { createRef } from 'react';
import classes from './search.module.css';

type MyProps = {
  search: (s: string) => void;
};

function Search(props: MyProps) {
  const inputRef = createRef<HTMLInputElement>();

  return (
    <div>
      <input
        ref={inputRef}
        className={classes.search_input}
        placeholder="Search..."
        list="SearchInput"
        defaultValue={localStorage.getItem('searchItem') || ''}
      ></input>
      <datalist id="SearchInput">
        <option id="tips">{localStorage.getItem('searchItem')}</option>
      </datalist>
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
