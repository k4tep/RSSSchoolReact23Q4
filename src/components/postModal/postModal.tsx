import React, { useEffect, useState } from 'react';
import classes from './postModal.module.css';
import { IData } from '../../interfaces/data';
import getCharacter from '../../api/get/get-character';
import { Link, useNavigate, useParams } from 'react-router-dom';

function PostModal() {
  const navigate = useNavigate();
  const [data, setData] = useState<IData>();
  const { id } = useParams();

  useEffect(() => {
    async function getCharacterModal() {
      try {
        const data = await getCharacter(Number(id));
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
    getCharacterModal();
  }, [id]);

  return (
    <div
      onClick={() => {
        navigate('/posts');
      }}
      className={classes.post_modal_container}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className={classes.post_container}
      >
        <Link className={classes.a} to={`/posts`}>
          X
        </Link>
        <h1>Name: {data?.name || 'Loading...'}</h1>
        <h2>Gender: {data?.gender || 'Loading...'}</h2>
        <h3>Birth year: {data?.birth_year || 'Loading...'}</h3>
        <h2>Height: {data?.height || 'Loading...'}</h2>
        <h2>Skin color: {data?.skin_color || 'Loading...'}</h2>
        <h2>Hair color: {data?.hair_color || 'Loading...'}</h2>
        <h2>Eye color: {data?.eye_color || 'Loading...'}</h2>
      </div>
    </div>
  );
}

export default PostModal;
