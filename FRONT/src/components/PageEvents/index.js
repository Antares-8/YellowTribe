// == Import : npm
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// == Import : local
import EventBloc from 'src/components/PageEvents/EventBloc';
import Header from 'src/components/Header';
import LittleMonth from 'src/components/LittleMonth';
import ModalNewEvent from 'src/components/Event/ModalNewEvent';

import './pageEvents.scss';


// == Composant
const PageEvents = () => {
  return (
    <div className="pageEvents">
      <Router>
        <EventBloc />
        <LittleMonth />
        <Header />
        <ModalNewEvent />
      </Router>
    </div>
  );
};

// == Export
export default PageEvents;
