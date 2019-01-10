import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BookCard from '../../../shared/bookCard/bookCard';
import { withRouter } from 'react-router-dom';
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

        }
    }
    details = (id) => {
        this.props.history.push(`/book/${id}`);
    }
    borrow = () => {

    }
    redirect = (id) => {
        
    }
  render() {
    const { classes } = this.props; 

    return (
        <Grid container  >
        
            {this.props.books.map(value => (
                <Grid item md={4} lg={3} sm={12} key={`grid${value['_id']}`}>
                    <BookCard details={this.details} borrow={this.borrow} book={value}  />
                </Grid>
            ))}
      </Grid>
    );
  }
}

BookDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(BookDisplay));