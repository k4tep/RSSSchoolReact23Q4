import React from 'react';
import Post from '../../components/post/post';
import getCharactersList from '../../api/get/get-list';
import { ApiData } from '../../interfaces/data';
import Header from '../../components/header/header';
import classes from './postPage.module.css';
import ErrorBoundary from '../../components/error/error';
import OpsyBtn from '../../components/opsyBtn/opsyBtn';

class PostPage extends React.Component {
  state: ApiData = {
    data: [],
    loading: false,
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const data = await getCharactersList(
        localStorage.getItem('searchItem') || ''
      );
      this.setState({ data: data.results });
      this.setState({ loading: false });
    } catch (error) {
      console.error(error);
    }
  }

  searchFunc = (search: string) => {
    localStorage.setItem('searchItem', search);
    this.componentDidMount();
  };

  render() {
    return (
      <div>
        <Header search={this.searchFunc} />
        <div className={classes.posts_container}>
          {!this.state.loading ? (
            this.state.data.length === 0 ? (
              <h1>Here no resultes</h1>
            ) : (
              this.state.data.map((e, index) => (
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
}

export default PostPage;
