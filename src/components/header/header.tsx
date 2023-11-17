import React from 'react';
import classes from './header.module.css';
import Search from '../search/search';

function Header() {
  return (
    <div className={classes.header_container}>
      <img
        src="icons8-star-wars-50.png"
        alt="SW-Logo"
        className={classes.img}
      />
      <Search />
    </div>
  );
}

export default Header;
