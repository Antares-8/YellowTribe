// == Import : npm
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// == Import : local
import EventBloc from 'src/components/PageEvents/EventBloc';
import Header from 'src/components/Header';
import LittleMonth from 'src/components/LittleMonth';
import Sidebar from 'src/containers/Sidebar';

// == Composant
const PageEvents = () => {
  return (
    <div className="PageEvents">
      <Router>
        <EventBloc />
        <LittleMonth />
        <Header />
        <Sidebar />
      </Router>
    </div>
  );
};

// == Export
export default PageEvents;
