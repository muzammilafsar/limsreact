import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { UiLoader } from '../../store/actions/ui.action';
import { connect} from 'react-redux';
import axios from 'axios';
import { serviceUrl } from '../../app.constant';
import DialogComponent  from '../../shared/dialogComponent/dialogComponent';
import BorrowCard  from './BorrowCard/BorrowCard';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  }
});

class BorrowedBooks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          fetchError: false,
          title: '',
          content: '',
          open: false,
          data: []
        }
    }  
    componentDidMount() {
        this.borrow();
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
      console.log(this.props.userData); 
      let data =localStorage.getItem('userdata');
      data = JSON.parse(data);
      if(!data) {
        this.props.history.push('/');
        return
      }
      const body = {
        email : data.email
      };
      console.log(this.props.userData);
      axios.post(`${serviceUrl.url}${serviceUrl.user.borrowedBooks}`, body).then(val => val.data).then(val => {
      // this.setState({open: true});        
        if(val.status === 200) {
          this.setState({fetchError: false, });
          this.setState({title: 'Success', content: 'Book Borrowed Successfully'.toUpperCase(), data: val['borrow']});
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
    return = (id) => {
      axios.post(`${serviceUrl.url}${serviceUrl.user.returnBook}`, {id}).then(val => val.data).then(val => {
        this.borrow();
        this.setState({open: true});        
          if(val.status === 200) {
            this.setState({fetchError: false, });
            this.setState({title: 'Success', content: 'Returned Book Successfully'.toUpperCase()});
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
        <DialogComponent withAction={false} action={()=> {}} title={this.state.title} content={this.state.content} handleClose={() => {this.closeDialog()}} open={this.state.open}></DialogComponent>

        <Grid container  >
                {this.state.data.map(val => {
                  return <Grid item md={6} lg={3} sm={12} key={''} style={{padding: '1em'}} key={val._id}>
                  <BorrowCard book={val} return={this.return} key={val._id}></BorrowCard>
              </Grid>
                })}
      </Grid>
      </div>
    );
  }
}

BorrowedBooks.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
  return {
    loader: state.UiReducer.loader,
    userData: state.authReducer,
    loginStatus: state.authReducer.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    startLoading : () => dispatch(UiLoader(true)),
    stopLoading : () => dispatch(UiLoader(false))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(BorrowedBooks)));