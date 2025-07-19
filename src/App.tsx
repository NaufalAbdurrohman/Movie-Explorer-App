import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '@/components/Pages/Home';
import { Detail } from '@/components/Pages/Detail';
import { Favorites } from './components/Pages/Favorites';
import SearchResult from './components/Pages/Search/SearchResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/search' element={<SearchResult />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
