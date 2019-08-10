// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import CellsYear from 'src/components/Year/CellsYear';

// Action Creators
import { onDateClick, openEvent } from 'src/store/reducer';


const mapStateToProps = ({ currentDate, selectedDate, eventDate, idOpenEvent, events, birthday, activeCategories }) => {
  return {
    currentDate,
    selectedDate,
    eventDate,
    idOpenEvent,
    events,
    birthday,
    activeCategories,
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
const CellsYearContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CellsYear);

// == Export
export default CellsYearContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CellsYear);
*/
