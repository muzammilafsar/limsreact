import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BookCard from '../../shared/bookCard/bookCard';
import { withRouter } from 'react-router-dom';
import { connect} from 'react-redux';
import BookDisplay from './BookDisplay/BookDisplay';
import axios from 'axios';
import { serviceUrl } from '../../app.constant';
import { UiLoader } from '../../store/actions/ui.action';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class Home extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        fetchError: false,
        allBooks: []
    };
}
  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };
  componentWillMount() {
      this.getBooks();
  }
  getBooks = () => {
    this.props.startLoading();
    axios.get(`${serviceUrl.url}${serviceUrl.admin.allBooks}`).then(val => val.data).then(val => {
        if(val.status === 200) {
          this.setState({fetchError: false, allBooks: val['books']});
          this.state.resetSubject.next();
        } else {
          this.setState({fetchError: true});
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
    <BookDisplay books={this.state.allBooks}></BookDisplay>
    );
  }
}

Home.propTypes = {
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
      stopLoading : () => dispatch(UiLoader(false))
    };
  };
  
export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Home)));