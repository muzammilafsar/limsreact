import React from 'react';
import PropTypes from 'prop-types';
import { Button, AppBar, Toolbar, IconButton, Typography, MenuItem, Menu,} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { UiLoader } from '../../store/actions/ui.action';
import { connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import GoogleLogin from '../../shared/googleLogin/googleLogin';
import { GoogleLogout } from 'react-google-login';
import { SET_UNAUTHENTICATED, SET_USER_DATA, SET_AUTHENTICATED, SET_ISADMIN } from '../../store/actions/auth.action';
import  AdminLogin  from '../../shared/adminLogin/adminLogin';
const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    padding: '0 10px 0 10px'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      adminModal: false
    };
  }
  openModal() {
    this.setState({adminModal: true});
  }
  componentDidMount() {
    this.props.admin.subscribe(val => {
      console.log('working');
      this.openModal();
    })
    console.log('auth working');
    let userData = localStorage.getItem('userdata');
    if( userData) {
      userData = JSON.parse(userData);
      this.props.setUserData(userData);
      this.props.setAuthenticated();
      if(userData && userData.isAdmin && userData.isAdmin === true) {
        this.props.history.push('/admin');
        this.props.setAdmin(true);
      }
    }
  }
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  logout = () => {
    console.log('logging out'); 
    this.props.setUnauthenticated();
    this.props.unsetUserData();
    localStorage.clear();
    this.props.history.push('/');
  }
  closeAdminModal = () => {
    this.setState({adminModal: false});
  }
  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
    
    return (
      <div className={classes.root}>
      <AdminLogin open={this.state.adminModal} close={this.closeAdminModal}></AdminLogin>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={() => {this.props.sideNavSubject.next(true)}} className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon  />
            </IconButton>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap >
              React Library
            </Typography>
            </Link>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Home
            </Typography>
            </Link>
            <Link to="/borrowedbooks" style={{ textDecoration: 'none', color: 'white' }}>
            {(this.props.isAuthenticated)?<Typography className={classes.title} variant="h6" color="inherit" noWrap>
            Borrowed Books
            </Typography>:''}
            </Link>
            {!this.props.isAuthenticated ? <Typography className={classes.title} variant="h6" color="inherit" noWrap onClick={() => {this.setState({adminModal: true})}}>
            Admin Login
            </Typography>: ''}
            {(!this.props.isAuthenticated)? <GoogleLogin></GoogleLogin > :<GoogleLogout
      buttonText="Logout"
      onLogoutSuccess={this.logout}
      render={(button) => <Button onClick={button.onClick}>Logout</Button>}
    >
    </GoogleLogout>}
            </div>
          </Toolbar>
        </AppBar>
        {(this.props.loader)? <LinearProgress color="secondary" />: ''}
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
  return {
    loader: state.UiReducer.loader,
    isAuthenticated: state.authReducer.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    startLoading : () => dispatch(UiLoader(true)),
    stopLoading : () => dispatch(UiLoader(false)),
    setUnauthenticated: () => dispatch(SET_UNAUTHENTICATED()),
    setAuthenticated: () => dispatch(SET_AUTHENTICATED()),
    unsetUserData: () => dispatch(SET_USER_DATA({})),
    setUserData: (data) => dispatch(SET_USER_DATA(data)),
    setAdmin: (data) => dispatch(SET_ISADMIN(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Header)));