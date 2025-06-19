import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { Home } from '@/components/Pages/Home';
import { Detail } from '@/components/Pages/Detail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
