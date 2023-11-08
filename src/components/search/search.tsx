import React, { createRef, useContext } from 'react';
import classes from './search.module.css';
import { SearchContext } from '../../contexts/searchContext';

type MyContext = {
  search: string;
  searchFunc: (e: string) => void;
};

function Search() {
  const inputRef = createRef<HTMLInputElement>();
  const { search, searchFunc } = useContext(SearchContext) as MyContext;

  return (
    <div>
      <input
        ref={inputRef}
        className={classes.search_input}
        placeholder="Search..."
        defaultValue={search || ''}
      ></input>
      <button
        className={classes.search_btn}
        onClick={() => searchFunc(inputRef.current?.value || '')}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
