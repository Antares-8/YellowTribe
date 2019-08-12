// == Import : npm
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


// == Import : local
import EventCard from 'src/components/News/EventCard';
import UserCard from 'src/components/News/UserCard';
import CommentCard from 'src/components/News/CommentCard';

import './news.scss';


// == Composant
const News = ({ news, fetchNews, closeEvent }) => {

  const [cards, setCards] = useState([]);
  useEffect(() => {
    closeEvent();
  }, []);

  const createCards = () => {
    const cardsTable = [];
    if (news !== undefined) {
      news.forEach((data) => {
        if (data[0].type === 'event') {
          cardsTable.push(
            <div className="cards" key={`${data.id}${data[0].type}`}>
              <EventCard data={data} />
            </div>
          );
        }
        if (data[0].type === 'user') {
          cardsTable.push(
            <div className="cards" key={`${data.id}${data[0].type}`}>
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
  closeEvent: PropTypes.func.isRequired,
};

// == Export
export default News;
