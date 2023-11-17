import React, { useContext } from 'react';
import classes from './post.module.css';
import { Link } from 'react-router-dom';
import { APIContext } from '../../contexts/apiContext';

type MyContext = {
  name: string | undefined;
  gender: string | undefined;
  birth: string | undefined;
  url: string | undefined;
};

function Post() {
  const { name, gender, birth, url } = useContext(APIContext) as MyContext;

  return (
    <div className={classes.post_container}>
      <img src="icons8-star-wars-250.png"></img>
      <h1 className={classes.post_text}>{name || 'Unknown'}</h1>
      <h3 className={classes.post_text}>{gender || 'Unknown'}</h3>
      <h2 className={classes.post_text}>{birth || 'Unknown'}</h2>
      <Link
        className={classes.a}
        to={`details/${url?.match(/\/\d*\/$/g)?.[0].slice(1, length - 1)}`}
      >
        Open
      </Link>
    </div>
  );
}

export default Post;
