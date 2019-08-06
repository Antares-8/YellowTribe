// == Import : npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import french from 'date-fns/locale/fr';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';


// == Import : local
// import './Event.scss';

// == Composant
const UserCard = ({ idOpenEvent, closeEvent, data }) => {

  const clickCloseHandler = () => {
    closeEvent();
  };

  const eventData = data;
  const event = eventData;
  console.log('event:', event);
  const formatHour = 'HH';
  const formatDay = 'dddd';
  const formatNumber = 'D';
  const formatMonth = 'MMMM';
  const formatLarge = 'D MMMM';
  const cercleColor = styled.div`
    backgroundColor: ${event.color};
  `;


  return (
    <div className="userCard">
      <Link to={`/event/${event.id}`}>
        <div className="mainPart">
          <img src="public/cochon.jpg" className="avatar" alt="profilpicture"/>
          <div className="textPart">
            <div className="name">{event.firstname} {event.lastname}</div>
            <div className="explication"> à rejoint la tribu {event.tribe.name}</div>
            <div className="explication"> le {dateFns.format(new Date(event.createdAt), formatLarge, { locale: french })}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

UserCard.propTypes = {
  events: PropTypes.array.isRequired,
  idOpenEvent: PropTypes.number.isRequired,
  closeEvent: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

// == Export
export default UserCard;
