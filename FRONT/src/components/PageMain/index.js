// == Import : npm
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// == Import : local
import Calendar from 'src/containers/Calendar';
// import News from 'src/components/News';
import Header from 'src/components/Header';
import Sidebar from 'src/containers/Sidebar';
import Nav from 'src/containers/Nav';
import Event from 'src/components/Event';

// == Composant
const PageMain = () => {
  return (
    <div className="PageMain">
      <Router>
        <Calendar />
        <Header />
        <Nav />
        <Event />
        <Sidebar />
      </Router>
    </div>
  );
};

// == Export
export default PageMain;
