import React from 'react';
import classes from './header.module.css';
import Search from '../search/search';

type MyProps = {
  search: (s: string) => void;
};

class Header extends React.Component<MyProps> {
  render() {
    return (
      <div className={classes.header_container}>
        <img
          src="icons8-star-wars-50.png"
          alt="SW-Logo"
          className={classes.img}
        />
        <Search search={this.props.search} />
      </div>
    );
  }
}

export default Header;
