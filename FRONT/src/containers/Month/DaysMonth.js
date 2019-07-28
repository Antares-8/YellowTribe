// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import DaysMonth from 'src/components/Month/DaysMonth';

// Action Creators


const mapStateToProps = ({ currentDate }) => ({
  currentDate,
});


const mapDispatchToProps = dispatch => ({
});

// Container
const DaysMonthContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DaysMonth);

// == Export
export default DaysMonthContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DaysMonth);
*/
