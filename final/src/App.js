import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Authentication from './components/authentication';
import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import Cards  from './components/cards';
import CreatePack from './components/create-pack';
import CreateCard from './components/create-card';
import Study from './components/study';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/packs/:packId" element={<Cards />} />
        <Route path="/create-pack" element={<CreatePack />} />
        <Route path="/packs/:packId/create-card" element={<CreateCard />} />
        <Route path="/packs/:packId/study-mode" element={<Study />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
