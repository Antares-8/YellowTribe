// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import CellsMonth from 'src/components/Month/CellsMonth';

// Action Creators
import { onDateClick, openEvent, fetchEventsCalendar } from 'src/store/reducer';


const mapStateToProps = ({ currentDate, selectedDate, eventDate, idOpenEvent, events, birthday }) => {
  return {
    currentDate,
    selectedDate,
    eventDate,
    idOpenEvent,
    events,
    birthday,
  };
};

const mapDispatchToProps = dispatch => ({
  onDateClick: (day) => {
    dispatch(onDateClick(day));
  },
  openEvent: (id) => {
    dispatch(openEvent(id));
  },
  fetchEventsCalendar: () => {
    dispatch(fetchEventsCalendar());
  },
});

// Container
const CellsMonthContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CellsMonth);

// == Export
export default CellsMonthContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CellsMonth);
*/
