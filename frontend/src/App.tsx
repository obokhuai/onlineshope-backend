import React from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { Outlet } from 'react-router-dom';



import './app.css';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main-content">
      <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
