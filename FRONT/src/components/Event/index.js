// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import french from 'date-fns/locale/fr';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { BrowserRouter, Link } from 'react-router-dom';


// == Import : local
// import './Event.scss';
import './event.scss';


// == Composant
const Event = ({ idOpenEvent, closeEvent, events }) => {

  const clickCloseHandler = () => {
    closeEvent();
  };

  const eventData = events.filter(eventsData => eventsData.id == idOpenEvent);
  const event = eventData[0];
  const formatHour = 'HH';
  const formatDay = 'dddd';
  const formatNumber = 'D';
  const formatMonth = 'MMMM';
  const formatLarge = 'dddd D MMMM';
  const cercleColor = styled.div`
    backgroundColor: ${event.color};
  `;

  console.log(event.user.firstname);

  return (
    <div className="event">
      <div className="icon close" onClick={clickCloseHandler}>close</div>
      <div className="titlePart">
        <div className="titleDate">
          <div className="day">{dateFns.format(new Date(event.beginingDate), formatDay, { locale: french })}</div>
          <div className="number">{dateFns.format(new Date(event.beginingDate), formatNumber, { locale: french })}</div>
          <div className="month">{dateFns.format(new Date(event.beginingDate), formatMonth, { locale: french })}</div>
        </div>
        <div className="title"> 
          <div className="mainTitle">{event.title}</div>
          <div className="baseTitle">
            <div className="author">Organisé par <span>{event.user.firstname}</span> / </div>
            <div className="cercle" style={{ backgroundColor: event.category.color }}></div>
            <div className="author"> Categorie <span>{event.category.title}</span></div>
          </div>
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
      <hr />
      <BrowserRouter forceRefresh={true}>
        <Link to={`/calendar/event/${event.id}`}>
          <div className="bouton">
            ouvrir l'event <Icon name="right chevron" />
          </div>
        </Link>
      </BrowserRouter>
    </div>
  );
};

Event.propTypes = {
  idOpenEvent: PropTypes.string.isRequired,
  closeEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

// == Export
export default Event;
