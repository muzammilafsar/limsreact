import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Link, withRouter } from 'react-router-dom';
import { connect} from 'react-redux';
import { UiLoader } from '../../store/actions/ui.action';
import { SET_UNAUTHENTICATED, SET_ISADMIN } from '../../store/actions/auth.action';
import { GoogleLogout } from 'react-google-login';
import GoogleLogin from '../../shared/googleLogin/googleLogin';
import AdminLogin from '../../shared/adminLogin/adminLogin';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class AdminSidenav extends React.Component {
  state = {
    left: false,
    adminModal: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  componentDidMount() {
      this.props.sideNavSubject.subscribe( val => {
        this.setState({left: val});
      })
  }
  logout = () => {
    localStorage.clear();
    this.props.setUnAuthenticated();
    this.props.setAdmin({});
    this.props.history.push('/');
  }  
  closeAdminModal = () => {
    this.setState({adminModal: false});
  }
  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
            <Link to="/admin">
            <ListItem button key={'home'} >
              <ListItemText primary={'Home'} />
            </ListItem>
            </Link>
            <Link to="/admin/addbook">
            <ListItem button key={'Add Book'} >
              <ListItemText primary={'Add Book'} />
            </ListItem>
            </Link>
            <Link to="/admin/borrowed">
            <ListItem button key={'All Borrowed Book'} >
              <ListItemText primary={'All Borrowed Book'} />
            </ListItem>
            </Link>
            <ListItem button key={'Logout'} onClick={this.logout} >
              <ListItemText primary={'Logout'} />
            </ListItem>
        </List>

      </div>
    );
    const userSideList = (
      <div className={classes.list}>
        <List>
            <Link to="/">
            <ListItem button key={'home'} >
              <ListItemText primary={`Home`} />
            </ListItem>
            </Link>
            {this.props.isAuthenticated? <Link to="/borrowedbooks">
            <ListItem button key={'Borrowed Books'} >
              <ListItemText primary={'Borrowed Books'} />
            </ListItem>
            </Link>: ''}
            {(!this.props.isAuthenticated)? <GoogleLogin></GoogleLogin > :<GoogleLogout
      buttonText="Logout"
      onLogoutSuccess={this.logout}
      render={(button) => <Button onClick={button.onClick}>Logout</Button>}
    >
    </GoogleLogout>}

        </List>

      </div>
    );

    return (
      <div>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {this.props.isAdmin ? sideList: userSideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

AdminSidenav.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
  return {
    loader: state.UiReducer.loader,
    isAdmin: state.authReducer.isAdmin,
    isAuthenticated: state.authReducer.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    startLoading : () => dispatch(UiLoader(true)),
    stopLoading : () => dispatch(UiLoader(false)),
    setUnAuthenticated: ()=> {dispatch(SET_UNAUTHENTICATED())},
    setAdmin: (data) => {dispatch(SET_ISADMIN(data))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(AdminSidenav)));