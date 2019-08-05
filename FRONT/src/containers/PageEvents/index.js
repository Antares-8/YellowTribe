// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import PageEvents from 'src/components/PageEvents';
// import dataCategories from 'src/components/Data/events.json';

// Action Creators
import {  } from 'src/store/reducer';

// const categories = dataCategories.map(dataCategory => dataCategory.category);

const mapStateToProps = ({ idOpenEvent }) => ({
  idOpenEvent,
});

const mapDispatchToProps = dispatch => ({

});

// Container
const PageEventsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageEvents);

// == Export
export default PageEventsContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageEvents);
*/
