// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import CellsWeek from 'src/components/Week/CellsWeek';

// Action Creators
import { onDateClick, openEvent } from 'src/store/reducer';


const mapStateToProps = ({ currentDate, selectedDate, events, activeCategories, idOpenEvent }) => {
  return {
    currentDate,
    selectedDate,
    events,
    activeCategories,
    idOpenEvent,
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
const CellsWeekContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CellsWeek);

// == Export
export default CellsWeekContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CellsWeek);
*/
