import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { UiLoader } from '../../store/actions/ui.action';
import { SET_ISADMIN, SET_AUTHENTICATED, SET_USER_DATA } from '../../store/actions/auth.action';
import { connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
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

class AdminHeader extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

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
    localStorage.clear();
    this.props.setUnAuthenticated();
    this.props.setAdmin({});
    this.props.history.push('/');
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
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={() => {this.props.sideNavSubject.next(true)}} className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon  />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Library Admin
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap onClick={this.logout} style={{pointer: 'click'}}>
                Logout
            </Typography>
            <Link to="/admin" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Home
            </Typography>
            </Link>
            <Link to="/admin/addbook" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Add New Book
            </Typography>
            </Link>
            <Link to="/admin/borrowed" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                All Borrowed Books
            </Typography>
            </Link>
            </div>
            <div className={classes.sectionMobile}>
            <Link to="/admin/addbook" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Add New Book
            </Typography>
            </Link>
            <Link to="/admin/borrowed" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                All Borrowed Books
            </Typography>
            </Link>
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

AdminHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
  return {
    loader: state.UiReducer.loader
  };
};
const mapDispatchToProps = dispatch => {
  return {
    startLoading : () => dispatch(UiLoader(true)),
    stopLoading : () => dispatch(UiLoader(false)),
    setUnAuthenticated: ()=> {dispatch(SET_AUTHENTICATED())},
    setAdmin: (data) => {dispatch(SET_ISADMIN(data))
    }
  };
};

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(AdminHeader)));