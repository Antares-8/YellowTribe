// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


// == Import : local
// import './News.scss';

// == Composant
const News = ({}) => {
  console.log(window.location.pathname.slice(7)); 
  return (
    
  );
};

News.propTypes = {
  // addNewsDate: PropTypes.func.isRequired,
  // NewsDate: PropTypes.string.isRequired,
};

// == Export
export default News;
