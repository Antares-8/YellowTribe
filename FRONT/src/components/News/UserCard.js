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

  const avatar = event.avatar !== null
    ? `../media/cache/thumb_back_list/uploads/avatars/${event.avatar}`
    : '../media/utils/defaultAvatar.png';


  return (
    <div className="userCard">
        <div className="mainPart">
        <div className="imgPart">
          <img src={avatar} className="avatar" alt="profilpicture" />
          <hr />
          <div className="newEventType"> Nouvel <br/> utilisateur</div>
        </div>
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
