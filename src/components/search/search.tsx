import React, { createRef } from 'react';
import classes from './search.module.css';

class Search extends React.Component {
  inputRef = createRef<HTMLInputElement>();
  state = {
    search: localStorage.getItem('searchItem'),
  };

  handleSearchItem = () => {
    localStorage.setItem('searchItem', this.inputRef.current?.value || '');
  };

  render() {
    return (
      <div>
        <input
          ref={this.inputRef}
          className={classes.search_input}
          placeholder="Search..."
          list="SearchInput"
        ></input>
        <datalist id="SearchInput">
          <option id="tips">{this.state.search}</option>
        </datalist>
        <button className={classes.search_btn} onClick={this.handleSearchItem}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
