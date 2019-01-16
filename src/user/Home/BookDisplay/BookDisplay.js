import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BookCard from '../../../shared/bookCard/bookCard';
import { withRouter } from 'react-router-dom';
import { UiLoader } from '../../../store/actions/ui.action';
import { connect} from 'react-redux';
import axios from 'axios';
import { serviceUrl } from '../../../app.constant';
import DialogComponent  from '../../../shared/dialogComponent/dialogComponent';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  }
});

class BookDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          fetchError: false,
          title: '',
          content: '',
          open: false
        }
    }  
    closeDialog = () => {
      this.setState({open: false});
    }
    details = (id) => {
        this.props.history.push(`/book/${id}`);
    }
    borrow = (id) => {
      console.log(id);
      this.props.startLoading();
      const body = {
        email : this.props.userData.email,
        bookid : id
      };
      console.log(this.props.loader);
      axios.post(`${serviceUrl.url}${serviceUrl.user.borrow}`, body).then(val => val.data).then(val => {
      this.setState({open: true});        
        if(val.status === 200) {
          this.setState({fetchError: false, });
          this.setState({title: 'Success', content: 'Book Borrowed Successfully'.toUpperCase()});
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
    redirect = (id) => {
        
    }
  render() {
    const { classes } = this.props; 

    return (
      <div>
        <DialogComponent withAction={false} action={()=> {}} title={this.state.title} content={this.state.content} handleClose={() => {this.closeDialog()}} open={this.state.open}></DialogComponent>

        <Grid container  >

        <div>
        {this.props.loader}

        </div>
            {this.props.books.map(value => (
                <Grid item md={4} lg={3} sm={12} key={`grid${value['_id']}`}>
                    <BookCard details={this.details} borrow={this.borrow} book={value} loader={this.props.loader} />
                </Grid>
            ))}
      </Grid>
      </div>
    );
  }
}

BookDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
};
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
    stopLoading : () => dispatch(UiLoader(false))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(BookDisplay)));