// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import CellsMonth from 'src/components/Month/CellsMonth';

// Action Creators
import { onDateClick } from 'src/store/reducer';


const mapStateToProps = ({ currentDate, selectedDate, eventDate }) => {
  return {
    currentDate,
    selectedDate,
    eventDate,
  };
};


const mapDispatchToProps = dispatch => ({
  onDateClick: (day) => {
    dispatch(onDateClick(day));
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
