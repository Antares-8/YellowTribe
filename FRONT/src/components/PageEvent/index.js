// == Import : npm
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// == Import : local
import Event from 'src/components/Event';
import Header from 'src/components/Header';
import Sidebar from 'src/containers/Sidebar';
import Calendar from 'src/containers/Calendar';
import Nav from 'src/containers/Nav';

// == Composant
const PageEvent = () => {
  return (
    <div className="PageEvent">
      <Router>
      <div className="agendaEtEvent">
        <Calendar />
        <Event />
      </div>
        <Header />
        <Nav />
        <Sidebar />
      </Router>
    </div>
  );
};

// == Export
export default PageEvent;
