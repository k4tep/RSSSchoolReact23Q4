import React, { useEffect } from 'react';
import classes from './postModal.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { fetchCharacter } from '../../store/characterSlice';

function PostModal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const character = useAppSelector((state) => state.character.results);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCharacter(Number(id)));
  }, [id, dispatch]);

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
        <h1>Name: {character?.name || 'Loading...'}</h1>
        <h2>Gender: {character?.gender || 'Loading...'}</h2>
        <h3>Birth year: {character?.birth_year || 'Loading...'}</h3>
        <h2>Height: {character?.height || 'Loading...'}</h2>
        <h2>Skin color: {character?.skin_color || 'Loading...'}</h2>
        <h2>Hair color: {character?.hair_color || 'Loading...'}</h2>
        <h2>Eye color: {character?.eye_color || 'Loading...'}</h2>
      </div>
    </div>
  );
}

export default PostModal;
