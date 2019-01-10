import React, { Component } from 'react';
import { connect} from 'react-redux';
import { Button } from '@material-ui/core';
import GoogleButton from './googleButton/googleButton';
import { GoogleLogin as GoogleLoginButton } from 'react-google-login';
import { SET_ISADMIN, SET_AUTHENTICATED, SET_USER_DATA } from '../../store/actions/auth.action';
class GoogleLogin extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
          logged: false,
          user: {},
          currentProvider: ''
        }
        this.nodes = {}

      }
    
      setNodeRef (provider, node) {
        if (node) {
          this.nodes[ provider ] = node
        }
      }
    
      onLoginSuccess = (user) => {
        //   this.props.setUserData(user);
          this.props.setAuthenticated();
      }
    
      onLoginFailure=(err) => {
        console.error(err)
    
        this.setState({
          logged: false,
          currentProvider: '',
          user: {}
        })
      }

    
  render() {
    return (
        <GoogleLoginButton
        buttonText='google'
        render = {(renderProps ) => <Button onClick={renderProps.onClick}> Login</Button>}
        clientId='513462824212-484udiibk79iqoq9f2lep86mugaeh2ek.apps.googleusercontent.com'
        onSuccess={this.onLoginSuccess}
        onFailure={this.onLoginFailure}
        key={'google'}></GoogleLoginButton>
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
      setAuthenticated: () => dispatch(SET_AUTHENTICATED())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogin);
