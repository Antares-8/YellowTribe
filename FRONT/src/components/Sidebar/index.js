import React from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'semantic-ui-react';
import classNames from 'class-names';

import ModalNewEvent from 'src/components/Event/ModalNewEvent';
import './sidebar.scss';


const Sidebar = ({ }) => {

  return (
    <div className="Sidebar">
      <ModalNewEvent />
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
  showModalNewEvent: PropTypes.func.isRequired,
  modalSidebar: PropTypes.bool.isRequired,
};

// == Export
export default Sidebar;
