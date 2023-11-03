import React, { useEffect, useState } from 'react';
import Post from '../../components/post/post';
import getCharactersList from '../../api/get/get-list';
import { IData } from '../../interfaces/data';
import Header from '../../components/header/header';
import classes from './postPage.module.css';
import OpsyBtn from '../../components/opsyBtn/opsyBtn';
import Pagination from '../../components/pagination/pagination';
import { useLocation, useNavigate } from 'react-router-dom';

function PostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<IData[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [page, setPage] = useState<number>(Number(location.search.slice(6, 7)));
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(location.search.slice(15));

  const searchFunc = (searchText: string) => {
    setPage(1);
    setSearch(searchText);
  };

  if (search.length >= 1 && page > 1) {
    setPage(1);
  }

  useEffect(() => {
    async function getList() {
      setLoading(true);
      console.log(page);

      try {
        const data = await getCharactersList(search, page);
        setPages(data.count);
        setData(data.results);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    navigate(`/posts?page=${page}&search=${search}`);
    getList();
  }, [search, page, navigate]);

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
      <OpsyBtn />
      <Pagination
        countOfPages={pages}
        currPage={page}
        newCurrPage={setPage}
      ></Pagination>
    </div>
  );
}

export default PostPage;
