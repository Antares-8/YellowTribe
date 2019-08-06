// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import DaysLittleMonth from 'src/components/LittleMonth/DaysLittleMonth';

// Action Creators


const mapStateToProps = ({ currentDate }) => ({
  currentDate,
});


const mapDispatchToProps = dispatch => ({
});

// Container
const DaysLittleMonthContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DaysLittleMonth);

// == Export
export default DaysLittleMonthContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DaysLittleMonth);
*/
