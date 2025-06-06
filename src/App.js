import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CompanyPage from './pages/CompanyPage';
import CreateCompanyPage from './pages/CreateCompanyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/company/:id" element={<CompanyPage />} />
        <Route path="/create" element={<CreateCompanyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;