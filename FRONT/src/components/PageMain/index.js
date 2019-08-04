// == Import : npm
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import classNames from 'class-names';


// == Import : local
import PageEvent from 'src/components/PageEvent';
import Calendar from 'src/containers/Calendar';
import News from 'src/components/News';
import Header from 'src/components/Header';
import Sidebar from 'src/containers/Sidebar';
import Nav from 'src/containers/Nav';
import Event from 'src/containers/Event';
import ModalNewEvent from 'src/components/Event/ModalNewEvent';
import './PageMain.scss';

// == Composant
const PageMain = ({ idOpenEvent }) => {
  return (
    <div className="PageMain">
      <Route exact path="/calendar" component={Calendar} />
      <Route exact path="/" component={Calendar} />
      <Header />
      <Nav />
      <ModalNewEvent />
      {idOpenEvent !== '' && <Event />}
      <Sidebar />
      <Route exact path="/event/name1" component={PageEvent} />
      <Route exact path="/event" component={PageEvent} />
    </div>
  );
};

PageMain.propTypes = {
  idOpenEvent: PropTypes.number.isRequired,
};

// == Export
export default PageMain;
