// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Sidebar from 'src/components/Sidebar';

// Action Creators
import { changeActiveCategories } from 'src/store/reducer';


const mapStateToProps = ({ modalNewEvent, idOpenEvent, tags, categories, activeCategories }) => ({
  modalNewEvent,
  idOpenEvent,
  tags,
  categories,
  activeCategories,
});


const mapDispatchToProps = dispatch => ({
  changeActiveCategories: (data) => {
    dispatch(changeActiveCategories(data));
  },
});

// Container
const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);

// == Export
export default SidebarContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
*/
