import React, { Component } from 'react';
import { connect} from 'react-redux';
import AllBooks from './AllBooks/AllBooks';
import {withRouter } from 'react-router-dom';
class Admin extends Component {
  componentDidMount() {
    let userData = localStorage.getItem('userdata');
    console.log(userData);
    if( userData) {
      userData = JSON.parse(userData);
      if(userData && userData.isAdmin && userData.isAdmin === true) {
      } else {
        this.props.history.push('/');
      }
    } else {
      this.props.history.push('/');
    }
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Admin));
