// == Import : npm
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import classNames from 'class-names';
import axios from 'axios';


// == Import : local
// import Calendar from 'src/containers/Calendar';


// == Composant
const News = ({ }) => {
  useEffect(() => {
    axios.get('http://95.142.174.217/api/events')
      .then((res) => {
        const eventsData = res.data;
        console.log(eventsData);
      });
  }, []);
  return (
    <div className="News"></div>
  );
};

News.propTypes = {
  nextCalendarType: PropTypes.func.isRequired,
  prevCalendarType: PropTypes.func.isRequired,
  calendarType: PropTypes.string.isRequired,
};

// == Export
export default News;
