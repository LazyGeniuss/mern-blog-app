import './App.css';
import Header from './header';
import IndexPage from './IndexPage';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import PostPages from './PostPages';
import {Routes,BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path = '/' element = {<IndexPage/>}/>
        <Route path = '/create' element = {<CreatePost/>}/>
        <Route path = '/edit/:id' element = {<EditPost/>}/>
        <Route path = '/post/:id' element = {<PostPages/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
