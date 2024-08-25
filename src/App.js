import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import { Layout } from './pages/Layout.tsx';
import { Home } from './pages/home/homePage.tsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
