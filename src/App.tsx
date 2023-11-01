import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PostPage from './pages/posts/postsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={'/posts'}></Navigate>}></Route>
        <Route path="/posts" element={<PostPage></PostPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
