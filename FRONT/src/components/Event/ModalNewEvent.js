// == Import : npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Router, Redirect, Route } from 'react-router-dom';
import { Button, Icon, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';


// == Import : local
// import './event.scss';
import Calendar from 'src/containers/Calendar';

// == Composant
const ModalNewEvent = () => {
  const [title, setTitle] = useState('');
  const [begining, setBegining] = useState();
  const [ending, setEnding] = useState();
  const [description, setDescription] = useState('');
  const [modal, setModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const titleHandler = (evt) => {
    setTitle(evt.target.value);
  };
  const beginingHandler = (evt) => {
    setBegining(evt.target.value);
  };
  const endingHandler = (evt) => {
    setEnding(evt.target.value);
  };
  const descriptionHandler = (evt) => {
    setDescription(evt.target.value);
  };
  const newEventHandler = () => {
    setModal(true);
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    setModal(false);
    setRedirect(true);
    axios.post('http://192.168.43.152/projet-PlanningFamille/BACK/familyback/public/event/new', {
      title,
      begining_date: begining,
      ending_date: ending,
      description,
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch(() => {
      });
  };

  const redirectEvent = () => {
    if (redirect) {
      return (
        <>
          <Redirect to="/event/name1" />
        </>
      );
    }
  };

  return (
    <>
      <Button onClick={newEventHandler}>
        créer un nouvel évenement
      </Button>
      <Modal open={modal}>
        <Modal.Header>Profile Picture</Modal.Header>
        <Modal.Content>
          <Form onSubmit={submitHandler}>
            <Form.Field>
              <label>titre de l'évenement</label>
              <input placeholder="titre de l'évenement" name='title' onChange={titleHandler} />
            </Form.Field>
            <div className="coupleInput">
              <Form.Field>
                <label>debut de l'évenement</label>
                <input type="date" name='begining_date' onChange={beginingHandler} />
              </Form.Field>
              <Form.Field>
                <label>fin de l'évenement</label>
                <input type="date" name='ending_date' onChange={endingHandler} />
              </Form.Field>
            </div>
            <Form.TextArea label='Description' placeholder="Dites en plus sur l'evenement" onChange={descriptionHandler} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Form.Button primary onClick={submitHandler}>
            enregistrer <Icon name='right chevron' />
          </Form.Button>
        </Modal.Actions>
      </Modal>
      {redirectEvent()}
    </>
  );
};

ModalNewEvent.propTypes = {
};

// == Export
export default ModalNewEvent;
