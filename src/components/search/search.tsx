import React, { createRef, useContext } from 'react';
import classes from './search.module.css';
import { SearchContext } from '../../contexts/searchContext';

type MyProps = {
  search: (s: string) => void;
};

function Search(props: MyProps) {
  const inputRef = createRef<HTMLInputElement>();
  const search = useContext(SearchContext);

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
        onClick={() => props.search(inputRef.current?.value || '')}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
