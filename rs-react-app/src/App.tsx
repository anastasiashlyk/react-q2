import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page/MainPage';
import AboutPage from './pages/about-page/AboutPage';
import NotFoundPage from './pages/not-found-page/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
