import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Form, Checkbox } from 'semantic-ui-react';

import './sidebar.scss';


const Sidebar = () => {

  const clickHandler = () => {

  }

  return (
    <div className="Sidebar">
      <div className="title" onClick="clickHandler">
        categories
      </div>
      <Form>
        <Form.Field control={Checkbox} label={<label>choix1</label>} />
      </Form>
      <Form>
        <Form.Field control={Checkbox} label={<label>choix2</label>} />
      </Form>
      <Form>
        <Form.Field control={Checkbox} label={<label>choix3</label>} />
      </Form>
      
    </div>
  );
};

Sidebar.propTypes = {
  
};

// == Export
export default Sidebar;
