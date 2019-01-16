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
import { Card, CardContent, CardActions, Typography, Button} from '@material-ui/core';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  }
});

class BorrowCard extends React.Component {

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
  render() {
    const { classes } = this.props; 

    return (
      <div>
          <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {this.props.book.title}
        </Typography>
        <Typography variant="h5" component="h2">
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {this.props.book.author}
        </Typography>
        <Typography component="p">
          Issued On : {this.props.book.issue_date}
          <br />
          Due Date : {this.props.book.Due_date}
        </Typography>
        <Typography component="p">
          Returned : {(this.props.book.Returned)? 'Yes': 'No'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" disabled={this.props.book.Returned} onClick={()=> {this.props.return(this.props.book._id)}}>Return</Button>
      </CardActions>
    </Card>
        <Grid container  >
        
                <Grid item md={6} lg={3} sm={12} key={''}>
                    
                </Grid>

      </Grid>
      </div>
    );
  }
}

BorrowCard.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(BorrowCard)));