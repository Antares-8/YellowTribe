// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import CellsYear from 'src/components/Year/CellsYear';

// Action Creators
import { onDateClick } from 'src/store/reducer';


const mapStateToProps = (state) => {
  return {
    currentDate: state.currentDate,
    selectedDate: state.selectedDate,
  };
};


const mapDispatchToProps = dispatch => ({
  onDateClick: (day) => {
    dispatch(onDateClick(day));
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
