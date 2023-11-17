import React, { createRef, useContext } from 'react';
import classes from './search.module.css';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { setSearchValue } from '../../store/charactersListSlice';
import { SearchContext } from '../../contexts/searchContext';

type MyContext = {
  searchInfo: string;
  searchFunc: (e: string) => void;
};

function Search() {
  const dispatch = useAppDispatch();
  const inputRef = createRef<HTMLInputElement>();
  const { searchInfo, searchFunc } = useContext(SearchContext) as MyContext;
  const searchValue = useAppSelector(
    (state) => state.charactersList.searchValue
  );
  const setupSearchValue = () =>
    dispatch(setSearchValue(inputRef.current?.value || ''));
  return (
    <div>
      <input
        ref={inputRef}
        className={classes.search_input}
        placeholder="Search..."
        defaultValue={searchValue || searchInfo || ''}
      ></input>
      <button
        className={classes.search_btn}
        onClick={() => {
          setupSearchValue();
          searchFunc(inputRef.current?.value || '');
          console.log('Info' + searchInfo, 'Value' + searchValue);
        }}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
