import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import Post from '../../components/post/post';
import Header from '../../components/header/header';
import classes from './postPage.module.css';
import OpsyBtn from '../../components/opsyBtn/opsyBtn';
import Pagination from '../../components/pagination/pagination';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../contexts/searchContext';
import { APIContext } from '../../contexts/apiContext';
import { fetchCharactersList } from '../../store/charactersListSlice';

function PostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const charactersList = useAppSelector(
    (state) => state.charactersList.results
  );
  const count = useAppSelector((state) => state.charactersList.count);
  const searchValue = useAppSelector(
    (state) => state.charactersList.searchValue
  );
  const viewMode = useAppSelector((state) => state.charactersList.viewMode);
  const loading = useAppSelector((state) => state.charactersList.loading);

  const searchInfo =
    location.search.match(/%27.*%27/)?.[0].slice(3, length - 3) || '';
  const [page, setPage] = useState<number>(
    Number(location.search.slice(6, 7)) === 0
      ? 1
      : Number(location.search.slice(6, 7))
  );

  const searchFunc = (searchText: string) => {
    localStorage.setItem('searchItem', searchText);
    setPage(1);
  };

  if (searchValue.length >= 1 && page > 1) {
    setPage(1);
  }

  useEffect(() => {
    navigate(`/posts?page=${page}&search='${searchValue}'`);
    dispatch(fetchCharactersList({ search: searchValue, page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, page, viewMode]);

  return (
    <div>
      <SearchContext.Provider value={{ searchInfo, searchFunc }}>
        <Header />
      </SearchContext.Provider>

      <Outlet />
      <div className={classes.posts_container}>
        {!loading ? (
          charactersList.length === 0 ? (
            <h1>Here no results</h1>
          ) : (
            charactersList.map((e, index) => (
              <APIContext.Provider
                value={{
                  name: e.name,
                  gender: e.gender,
                  birth: e.birth_year,
                  url: e.url,
                }}
                key={index}
              >
                <Post />
              </APIContext.Provider>
            ))
          )
        ) : (
          <h1>
            Please wait, the API is slow and this is its feature. Loading...
          </h1>
        )}
      </div>
      <OpsyBtn />
      <Pagination
        countOfPages={count}
        currPage={page}
        newCurrPage={setPage}
      ></Pagination>
    </div>
  );
}

export default PostPage;
