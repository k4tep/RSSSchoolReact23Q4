import React from 'react';
import Post from '../../components/post/post';
import getCharactersList from '../../api/get/get-list';
import { ApiData } from '../../interfaces/data';
import Header from '../../components/header/header';
import classes from './postPage.module.css';

class PostPage extends React.Component {
  state: ApiData = {
    data: [],
  };

  async componentDidMount() {
    try {
      let data = await getCharactersList();
      this.setState({ data: data.results });
      console.log(this.state.data);
    } catch (error) {
      console.log(error);
    }
  }
  // componentDidUpdate() {
  //   document.title = `Вы нажали ${this.state.count} раз`;
  //   console.log(this.state.data);
  // }

  render() {
    return (
      <div>
        <Header />
        <div className={classes.posts_container}>
          {this.state.data.length === 0 ? (
            <h1>Loading...</h1>
          ) : (
            this.state.data.map((e, index) => (
              <Post
                name={e.name}
                gender={e.gender}
                birth={e.birth_year}
                key={index}
              />
            ))
          )}
          {/* <Post /> */}
        </div>
      </div>
    );
  }
}

export default PostPage;
