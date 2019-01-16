import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
      minHeight: '36em'
  },
  media: {
    height: '40em',
  },
};

function BookCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card} style={{margin: '10px'}} key={props.book._id}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.book.image}
          title={props.book.title}
          onClick={ () => {props.details(props.book._id)}}
        />
        <CardContent style={{height: '7em'}}>
          <Typography gutterBottom variant="h6" component="h3">
          {props.book.title}
          </Typography>
          <Typography component="p">
          {props.book.description.slice(0, 100)}{(props.book.description.length > 100)? '...': ''}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={ () => {props.details(props.book._id)}} size="small" color="primary">
          Details
        </Button>
        {props.disable}
        <Button onClick={ () => {props.borrow(props.book._id)}} disabled={props.loader} size="small" color="primary">
          Borrow 
        </Button>
      </CardActions>
    </Card>
  );
}

BookCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookCard);