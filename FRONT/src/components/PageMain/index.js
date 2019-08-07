// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


// == Import : local
import Calendar from 'src/containers/Calendar';
import News from 'src/containers/News';
import Header from 'src/containers/Header';
import Sidebar from 'src/containers/Sidebar';
import Nav from 'src/containers/Nav';
import Event from 'src/containers/Event';
import ModalNewEvent from 'src/components/Event/ModalNewEvent';
import SearchBar from 'src/containers/Header/SearchBar';

import './pageMain.scss';

// == Composant
const PageMain = ({ idOpenEvent }) => {
  return (
    <div className="PageMain">
      <SearchBar />
      <Route exact path="/calendar" component={Calendar} />
      <Route exact path="/" component={Calendar} />
      <Route exact path="/news" component={News} />
      <Header />
      <Nav />
      <ModalNewEvent />
      {idOpenEvent !== '' && <Event />}
      <Sidebar />
    </div>
  );
};

PageMain.propTypes = {
  idOpenEvent: PropTypes.number.isRequired,
};

// == Export
export default PageMain;
