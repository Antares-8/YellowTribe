// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Header from 'src/components/Header';
// import dataCategories from 'src/components/Data/events.json';

// Action Creators
import {  } from 'src/store/reducer';

// const categories = dataCategories.map(dataCategory => dataCategory.category);

const mapStateToProps = ({ profile, events }) => ({
  profile,
  events,
});


const mapDispatchToProps = dispatch => ({

});

// Container
const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

// == Export
export default HeaderContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
*/
