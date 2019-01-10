import React, { Component } from 'react';
import { connect} from 'react-redux';
import AllBooks from './AllBooks/AllBooks';
class Admin extends Component {
  render() {
    return (
        <AllBooks />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    key: state
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
