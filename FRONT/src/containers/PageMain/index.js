// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import PageMain from 'src/components/PageMain';
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
const PageMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageMain);

// == Export
export default PageMainContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageMain);
*/
