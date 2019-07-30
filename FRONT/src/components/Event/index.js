// == Import : npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';


// == Import : local
// import './Event.scss';

// == Composant
const Event = () => {
  // console.log(window.location.pathname.slice(7)); 
  useEffect(() => {
    axios.get('http://192.168.43.152/projet-PlanningFamille/BACK/familyback/public/event')
      .then((res) => {
        const eventData = res.data;
        console.log(eventData);
      })
  }, []);
  return (
    <div className="event">
      <div className="titleDate">
        <div className="day"></div>
        <div className="number"></div>
        <div className="month"></div>
      </div>
      <div className="title"></div>
      <div className="author">Organisé par <span></span></div>
      <div className="dates">
        du <span className="date"></span> à <span className="hour"></span>
        au <span className="date"></span> à <span className="hour"></span>
      </div>
      <div className="location"></div>
      <div className="description"></div>
    </div>
  );
  };

Event.propTypes = {
  // addEventDate: PropTypes.func.isRequired,
  // eventDate: PropTypes.string.isRequired,
};

// == Export
export default Event;
