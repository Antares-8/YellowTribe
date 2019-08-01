// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Event from 'src/components/Event';
// import dataCategories from 'src/components/Data/events.json';

// Action Creators
import { closeEvent } from 'src/store/reducer';

// const categories = dataCategories.map(dataCategory => dataCategory.category);

const mapStateToProps = ({ idOpenEvent }) => ({
  idOpenEvent,
});

const mapDispatchToProps = dispatch => ({
  closeEvent: () => {
    dispatch(closeEvent());
  },
});

// Container
const EventContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Event);

// == Export
export default EventContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Event);
*/
