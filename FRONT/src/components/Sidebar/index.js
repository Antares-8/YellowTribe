import React from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox, Label, Icon } from 'semantic-ui-react';
import classNames from 'class-names';

import './sidebar.scss';


const Sidebar = ({ idOpenEvent, tags }) => {

  // classNames //
  const withEvent = classNames({
    withEvent: idOpenEvent !== '',
  });
  console.log(tags);

  return (
    <div className={`sidebar ${withEvent}`}>
      <div className="title">
        categories
      </div>
      <Form>
        <Form.Field control={Checkbox} label={<label>All</label>} />
        <Form.Field control={Checkbox} label={<label>choix2</label>} />
      </Form>
      <div className="tribeTag">
        <div className="title">
          Tribe
        </div>
        <div className="tags">
          <Label>
            Adrienne
            <Icon name='delete' />
          </Label>
          <Label image>
            Zoe
            <Icon name='delete' />
          </Label>
          <Label image>
            Nan
            <Icon name='delete' />
          </Label>
        </div>
      </div>
      
      
    </div>
  );
};

Sidebar.propTypes = {
  idOpenEvent: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};

// == Export
export default Sidebar;
