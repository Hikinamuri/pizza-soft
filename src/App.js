import './App.css';
import {Routes, Route} from "react-router-dom";
import { Layout } from './pages/Layout.tsx';
import { Home } from './pages/home/homePage.tsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/home' element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
