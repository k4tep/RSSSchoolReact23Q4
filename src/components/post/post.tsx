import React from 'react';
import classes from './post.module.css';
import { Link } from 'react-router-dom';

type MyProps = {
  name: string | undefined;
  gender: string | undefined;
  birth: string | undefined;
  url: string | undefined;
};

function Post(props: MyProps) {
  return (
    <div className={classes.post_container}>
      <img src="icons8-star-wars-250.png"></img>
      <h1 className={classes.post_text}>{props.name || 'Unknown'}</h1>
      <h3 className={classes.post_text}>{props.gender || 'Unknown'}</h3>
      <h2 className={classes.post_text}>{props.birth || 'Unknown'}</h2>
      <Link
        className={classes.a}
        to={`details/${props.url
          ?.match(/\/\d*\/$/g)?.[0]
          .slice(1, length - 1)}`}
      >
        Open
      </Link>
    </div>
  );
}

export default Post;
