import React, { createRef } from 'react';
import classes from './search.module.css';

type MyProps = {
  search: (s: string) => void;
};

class Search extends React.Component<MyProps> {
  inputRef = createRef<HTMLInputElement>();

  render() {
    return (
      <div>
        <input
          ref={this.inputRef}
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
          onClick={() => this.props.search(this.inputRef.current?.value || '')}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
