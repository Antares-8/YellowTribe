// == Import : npm
import React from 'react';
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
const UserCard = ({ data }) => {

  const eventData = data;
  const event = eventData;
  const formatLarge = 'D MMMM';


  return (
    <div className="userCard">
        <div className="mainPart">
          <img src={event.avatar} className="avatar" alt="profilpicture" />
          <div className="textPart">
            <div className="name">{event.firstname} {event.lastname}</div>
            <div className="explication"> à rejoint la tribu {event.tribe.name}</div>
            <div className="explication"> le {dateFns.format(new Date(event.createdAt), formatLarge, { locale: french })}</div>
          </div>
        </div>
    </div>
  );
};

UserCard.propTypes = {
  data: PropTypes.array.isRequired,
};

// == Export
export default UserCard;
