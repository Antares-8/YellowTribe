// == Import : npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import french from 'date-fns/locale/fr';
import styled from 'styled-components';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';


// == Import : local
// import './Event.scss';
import events from 'src/components/Data/events.json';


// == Composant
const EventBloc = ({ idOpenEvent, closeEvent }) => {
  const idEvent = window.location.pathname.slice(7); 
  useEffect(() => {
    axios.get(`http://95.142.174.217/api/events/${idOpenEvent}`)
      .then((res) => {
        const eventData = res.data;
        console.log(eventData);
      });
  }, []);

  const clickCloseHandler = () => {
    closeEvent();
  };
  
  const eventData = events.filter(eventsData => eventsData.id == idEvent);
  const event = eventData[0];
  const formatHour = 'HH';
  const formatDay = 'dddd';
  const formatNumber = 'D';
  const formatMonth = 'MMMM';
  const formatLarge = 'dddd D MMMM';
  const cercleColor = styled.div`
    backgroundColor: ${event.color};
  `;

  return (
    <div className="event"> 
      <div className="eventContainer">
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
              <div className="author">Organisé par <span>{event.user}</span> / </div>
              <div className="cercle" style={{ backgroundColor: event.color }}></div>
              <div className="author"> Categorie <span>{event.category}</span></div>
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
        
        <Comment.Group>
      <Header as='h3' dividing>
        Comments
      </Header>

      <Comment>
        <Comment.Avatar src='/images/avatar/small/matt.jpg' />
        <Comment.Content>
          <Comment.Author as='a'>Matt</Comment.Author>
          <Comment.Metadata>
            <div>Today at 5:42PM</div>
          </Comment.Metadata>
          <Comment.Text>How artistic!</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>

      <Comment>
        <Comment.Avatar src='/images/avatar/small/elliot.jpg' />
        <Comment.Content>
          <Comment.Author as='a'>Elliot Fu</Comment.Author>
          <Comment.Metadata>
            <div>Yesterday at 12:30AM</div>
          </Comment.Metadata>
          <Comment.Text>
            <p>This has been very useful for my research. Thanks as well!</p>
          </Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src='/images/avatar/small/jenny.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>Jenny Hess</Comment.Author>
              <Comment.Metadata>
                <div>Just now</div>
              </Comment.Metadata>
              <Comment.Text>Elliot you are always so right :)</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      </Comment>

      <Comment>
        <Comment.Avatar src='/images/avatar/small/joe.jpg' />
        <Comment.Content>
          <Comment.Author as='a'>Joe Henderson</Comment.Author>
          <Comment.Metadata>
            <div>5 days ago</div>
          </Comment.Metadata>
          <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>

      <Form reply>
        <Form.TextArea />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>
    </Comment.Group>
    </div>
    </div>
  );
};

EventBloc.propTypes = {
  idOpenEvent: PropTypes.number.isRequired,
  closeEvent: PropTypes.func.isRequired,
};

// == Export
export default EventBloc;
