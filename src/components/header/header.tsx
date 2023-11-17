import React, { createRef } from 'react';
import classes from './header.module.css';
import Search from '../search/search';
import { changeViewMode } from '../../store/charactersListSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

function Header() {
  const dispatch = useAppDispatch();
  const dropDownRef = createRef<HTMLSelectElement>();

  const viewMode = useAppSelector((state) => state.charactersList.viewMode);

  const setViewMode = () =>
    dispatch(changeViewMode(Number(dropDownRef.current?.value)));

  return (
    <div className={classes.header_container}>
      <div className={classes.container}>
        <img
          src="icons8-star-wars-50.png"
          alt="SW-Logo"
          className={classes.img}
        />
        <Search />
      </div>
      <div className={classes.container}>
        <label htmlFor="count" className={classes.label}>
          View mode:
        </label>
        <select
          ref={dropDownRef}
          name="countOfCords"
          id="count"
          className={classes.dropdown}
          onChange={setViewMode}
        >
          {[1, 2].map((e) => (
            <option selected={viewMode === e} value={e} key={e}>
              {e === 2 ? 'all' : '10'}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Header;
