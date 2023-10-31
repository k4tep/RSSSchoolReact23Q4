import React, { useEffect, useState } from 'react';
import Post from '../../components/post/post';
import getCharactersList from '../../api/get/get-list';
import { ApiResponse, IData } from '../../interfaces/data';
import Header from '../../components/header/header';
import classes from './postPage.module.css';
import ErrorBoundary from '../../components/error/error';
import OpsyBtn from '../../components/opsyBtn/opsyBtn';

function PostPage() {
  const [data, setData] = useState<IData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);

  async function getList() {
    setLoading(true);
    try {
      const data = await getCharactersList(
        localStorage.getItem('searchItem') || ''
      );
      setData(data.results);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  const searchFunc = (search: string) => {
    localStorage.setItem('searchItem', search);
    setSearch(!search);
  };

  useEffect(() => {
    getList();
  }, [search]);

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
    </div>
  );
}

export default PostPage;
