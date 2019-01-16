import React from 'react';
import {Dialog, DialogContent, DialogTitle, TextField, DialogActions, DialogContentText} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect} from 'react-redux';
import axios from 'axios';
import { serviceUrl } from '../../app.constant';
import { UiLoader } from '../../store/actions/ui.action';
import { SET_ISADMIN, SET_AUTHENTICATED, SET_USER_DATA } from '../../store/actions/auth.action';

import { Button, } from '@material-ui/core';
class AdminLogin extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        fetchError: false,
        title: '',
        content: '',
        open: true,
        username: '',
        password: '',
        error: 'Username or password is Incorrect',

    };
    }
    componentWillMount() {

    }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  closeDialog = () => {
    this.setState({open: false});
  }
  login = (id) => {
    console.log(id);
    this.props.startLoading();
    const body = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(this.props.loader);
    axios.post(`${serviceUrl.url}${serviceUrl.admin.adminlogin}`, body).then(val => val.data).then(val => {
      this.setState({open: true});
      if(val.status === 200) {
        this.setState({fetchError: false });
        localStorage.setItem('userdata', JSON.stringify({isAdmin: true}));
        this.props.history.push('/admin');
      } else {
        this.setState({fetchError: true});
        this.setState({title: 'Error', content: val.message.toUpperCase()});
        
      }
      this.props.stopLoading()
    }).catch(err => {
      this.setState({fetchError: true});
      this.props.stopLoading();
  }) 
  }
  render() {
    const { classes } = this.props; 

    return (
        <div>
           
        <Dialog
          open={this.props.open}
          onClose={this.props.close}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Admin Login</DialogTitle>
          <DialogContent>
          <DialogContentText>
              {(this.state.fetchError)?this.state.error:''}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="email"
              fullWidth
              onChange={(val) => {this.setState({username: val.target.value})}}
            />
             <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={(val) => {this.setState({password: val.target.value})}}

            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" disabled={this.props.loader}>
              Cancel
            </Button>
            <Button onClick={this.login} color="primary" disabled={this.props.loader || (this.state.username === '' || this.state.password === '')}>
              Login
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    );
  }
}
const mapStateToProps = state => {
    return {
      loader: state.UiReducer.loader,
      userData: state.authReducer.userData,
      loginStatus: state.authReducer.isAuthenticated
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      startLoading : () => dispatch(UiLoader(true)),
      stopLoading : () => dispatch(UiLoader(false)),
      setAdmin: () => dispatch(SET_ISADMIN(true))
    };
  };
  
export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminLogin));