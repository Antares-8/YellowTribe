// == Import : npm
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import classNames from 'class-names';
import axios from 'axios';
import dateFns, { compareAsc } from 'date-fns';
import { Card } from 'semantic-ui-react';


// == Import : local
import EventCard from 'src/components/News/EventCard';
import UserCard from 'src/components/News/UserCard';

import './news.scss';


// == Composant
const News = ({ news, fetchNews }) => {

  const [cards, setCards] = useState([]);
  console.log(news);

  const createCards = (news) => {
    const cardsTable = [];
    if (news !== undefined) {
      news.forEach((data) => {
        if (data[0].type === 'event') {
          cardsTable.push(
            <div className="cards">
              <EventCard data={data} />
            </div>
          );
        }
        if (data[0].type === 'user') {
          cardsTable.push(
            <div className="cards">
              <UserCard data={data} />
            </div>
          );
        }
      });
    }
    setCards(cardsTable);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    createCards(news);
  }, [news]);

  return (
    <div className="news">
      {cards}
    </div>
  );
};

News.propTypes = {
  news: PropTypes.array.isRequired,
  fetchNews: PropTypes.func.isRequired,
};

// == Export
export default News;
