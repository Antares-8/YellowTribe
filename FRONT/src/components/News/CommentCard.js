// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import french from 'date-fns/locale/fr';
import styled from 'styled-components';
import { BrowserRouter, Link } from 'react-router-dom';


// == Import : local
// import './Event.scss';

// == Composant
const CommentCard = ({ data }) => {

  const { event } = data;
  const formatHour = 'HH';
  const formatDay = 'dddd';
  const formatNumber = 'D';
  const formatMonth = 'MMMM';
  const formatLarge = 'dddd D MMMM';
  console.log('comment', event);

  const Categorie = styled.div`
  background-color: ${event.category.color};
  color: #fff5d7;
  border-radius: 0.5em;
  margin-bottom: 0.7em;
  padding: 0.15em 0.8em;
  font-size: 80%;
`;

  
  return (
    <div className="eventCard">
      <BrowserRouter forceRefresh={true}>
        <Link to={`calendar/event/${event.id}`}>
          <div className="titlePart">
            <div className="titleDate">
              <Categorie className="category"><span>{event.category.title}</span></Categorie>
              <div className="day">{dateFns.format(new Date(event.beginingDate), formatDay, { locale: french })}</div>
              <div className="number">{dateFns.format(new Date(event.beginingDate), formatNumber, { locale: french })}</div>
              <div className="month">{dateFns.format(new Date(event.beginingDate), formatMonth, { locale: french })}</div>
              <hr />
              <div className="newEventType"> Nouvel <br/> évènement</div>
            </div>
            <div className="contain">
              <div className="title"> 
                <div className="mainTitle">{event.title}</div>
                <div className="baseTitle">
                  <div className="author">Organisé par <span>{event.user.firstname}</span></div>
                </div>
              </div>
              <hr />
              <div className="dates"> <span className="icon">date_range </span> 
                Du <span className="date">{dateFns.format(new Date(event.beginingDate), formatLarge, { locale: french })}</span> à <span className="hour">{dateFns.format(new Date(event.beginingDate), formatHour)}h </span>
                au <span className="date">{dateFns.format(new Date(event.endingDate), formatLarge, { locale: french })}</span> à <span className="hour">{dateFns.format(new Date(event.endingDate), formatHour)}h</span>
              </div>
              <div className="location"><span className="icon">location_on</span>{event.place}</div>
              <hr />
              <div className="description"> {event.description}</div>
            </div>
          </div>
        </Link>
      </BrowserRouter>
    </div>
  );
};

CommentCard.propTypes = {
  data: PropTypes.object.isRequired,
};

// == Export
export default CommentCard;
