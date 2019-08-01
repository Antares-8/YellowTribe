import React from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'semantic-ui-react';
import classNames from 'class-names';

import './sidebar.scss';


const Sidebar = ({ idOpenEvent}) => {

  // classNames //
  const withEvent = classNames({
    withEvent: idOpenEvent !== '',
  });

  return (
    <div className={`sidebar ${withEvent}`}>
      <div className="title">
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
      <div className="title">
        Tribe
      </div>
      <Form>
        <Form.Field control={Checkbox} label={<label>Joëlle</label>} />
      </Form>
      <Form>
        <Form.Field control={Checkbox} label={<label>Jean-Marie</label>} />
      </Form>
      <Form>
        <Form.Field control={Checkbox} label={<label>Nadia</label>} />
      </Form>
      <Form>
        <Form.Field control={Checkbox} label={<label>Raymond</label>} />
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
