import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AllCases from './pages/AllCases';
import CasePage from './pages/CasePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import SubmitFlaw from './pages/SubmitFlaw';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cases" element={<AllCases />} />
        <Route path="/cases/:id" element={<CasePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/submit" element={<SubmitFlaw />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;