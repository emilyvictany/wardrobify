import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatList from './HatList';
import HatForm from './HatForm';
import ShoeForm from './ShoeForm';
import ShoeList from './ShoeList';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hats" element={<HatList />} />
          <Route path="/hats/new" element = {<HatForm />} />
          <Route path="/shoes/new" element = {<ShoeForm />} />
          <Route path="/shoes" element={<ShoeList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
