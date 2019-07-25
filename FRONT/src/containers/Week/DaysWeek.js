// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import DaysWeek from 'src/components/Week/DaysWeek';

// Action Creators


const mapStateToProps = ({ currentDate }) => ({
  currentDate,
});


const mapDispatchToProps = dispatch => ({
});

// Container
const DaysWeekContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DaysWeek);

// == Export
export default DaysWeekContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DaysWeek);
*/
