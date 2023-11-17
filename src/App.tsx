import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PostPage from './pages/posts/postsPage';
import PostModal from './components/postModal/postModal';
import ErrorPage from './pages/error/errorPage';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={'/posts'} />}></Route>
        <Route path="/posts" element={<PostPage />}>
          <Route path="details/:id" element={<PostModal />}></Route>
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
