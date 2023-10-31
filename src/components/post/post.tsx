import React from 'react';
import classes from './post.module.css';

type MyProps = {
  name: string | undefined;
  gender: string | undefined;
  birth: string | undefined;
};

function Post(props: MyProps) {
  return (
    <div className={classes.post_container}>
      <img src="icons8-star-wars-250.png"></img>
      <h1 className={classes.post_text}>{props.name || 'Unknown'}</h1>
      <h3 className={classes.post_text}>{props.gender || 'Unknown'}</h3>
      <h2 className={classes.post_text}>{props.birth || 'Unknown'}</h2>
    </div>
  );
}

export default Post;
