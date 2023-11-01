import React, { useEffect, useState } from 'react';
import Post from '../../components/post/post';
import getCharactersList from '../../api/get/get-list';
import { IData } from '../../interfaces/data';
import Header from '../../components/header/header';
import classes from './postPage.module.css';
import ErrorBoundary from '../../components/error/error';
import OpsyBtn from '../../components/opsyBtn/opsyBtn';
import Pagination from '../../components/pagination/pagination';
import { useNavigate } from 'react-router-dom';

function PostPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<IData[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);

  const searchFunc = (search: string) => {
    localStorage.setItem('searchItem', search);
    if (localStorage.getItem('searchItem') !== '') {
      setPage(1);
    }
    setSearch(!search);
  };

  useEffect(() => {
    async function getList() {
      setLoading(true);
      // navigate('/page' + page);
      try {
        const data = await getCharactersList(
          localStorage.getItem('searchItem') || '',
          page
        );
        setPages(data.count);
        setData(data.results);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    getList();
  }, [search, page]);

  return (
    <div>
      <Header search={searchFunc} />
      <div className={classes.posts_container}>
        {!loading ? (
          data.length === 0 ? (
            <h1>Here no resultes</h1>
          ) : (
            data.map((e, index) => (
              <Post
                name={e.name}
                gender={e.gender}
                birth={e.birth_year}
                key={index}
              />
            ))
          )
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <ErrorBoundary>
        <OpsyBtn />
      </ErrorBoundary>
      <Pagination
        countOfPages={pages}
        currPage={page}
        newCurrPage={setPage}
      ></Pagination>
    </div>
  );
}

export default PostPage;
