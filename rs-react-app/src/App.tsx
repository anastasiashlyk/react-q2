import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page/MainPage';
import AboutPage from './pages/about-page/AboutPage';
import NotFoundPage from './pages/not-found-page/NotFoundPage';
import Details from './components/Details/Details';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <header className="app-header">
        <button onClick={toggle}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="details/:name" element={<Details />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
