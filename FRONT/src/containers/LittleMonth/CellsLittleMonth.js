// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import CellsLittleMonth from 'src/components/LittleMonth/CellsLittleMonth';

// Action Creators
import { onDateClick, openEvent } from 'src/store/reducer';


const mapStateToProps = ({ currentDate, selectedDate, eventDate, idOpenEvent, events }) => {
  return {
    currentDate,
    selectedDate,
    eventDate,
    idOpenEvent,
    events,
  };
};


const mapDispatchToProps = dispatch => ({
  onDateClick: (day) => {
    dispatch(onDateClick(day));
  },
  openEvent: (id) => {
    dispatch(openEvent(id));
  },
});

// Container
const CellsLittleMonthContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CellsLittleMonth);

// == Export
export default CellsLittleMonthContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CellsLittleMonth);
*/
