// == Import : npm
import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';


// == Import : local

// == Composant
const ModalNewEvent = () => {

  return (
    <div className="modalEvent">
      <BrowserRouter forceRefresh={true}>
        <Link to={"/calendar/event/new"}>
          <Button>
            <div className="addEvent"><span className="icon">add</span>nouvel évenement</div>
          </Button>
        </Link>
      </BrowserRouter>
    </div>
  );
};

ModalNewEvent.propTypes = {
};

// == Export
export default ModalNewEvent;
