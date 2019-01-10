import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { connect} from 'react-redux';
import axios from 'axios';
import { serviceUrl } from '../../app.constant';
import { UiLoader } from '../../store/actions/ui.action';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { Button } from '@material-ui/core';

class BookDetail extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        fetchError: false,
        book: {}
    };
    }
    componentWillMount() {
        if(this.props.match.params.id) {
          this.getBook(this.props.match.params.id);
        } else {
            this.props.history.push('/admin');
        }
    }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };
  getBook = (id) => {
      this.props.startLoading();
    axios.post(`${serviceUrl.url}${serviceUrl.admin.getbook}`, {id}).then(val => val.data).then(val => {
        if(val.status === 200) {
          this.setState({fetchError: false, book: val['books']});
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
        <Grid container justify="center" style={{paddingTop: 20}}>
            <Grid item md={3} sm={12} xs={12}>
            <Card>
            <CardMedia style={{height: 600}}
          image={this.state.book.image}
          title={this.state.book.title}
        /></Card>
    </Grid>
            <Grid item md={6} sm={12} xs={12} direction="row" style={{padding: 20}}>
                <Grid item>
                <Typography variant="h3" gutterBottom>
                {this.state.book.title}
                </Typography>
                </Grid>
                <Grid item>
                <Typography variant="h5" gutterBottom>
                {this.state.book.author}
      </Typography>
                </Grid>
                <Grid item>
                <Typography variant="body1" gutterBottom>
                {this.state.book.description}
                </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" size="large" color="primary" disabled={this.props.loader} >Borrow</Button>
                </Grid>
            </Grid>
        </Grid>
    );
  }
}
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
  
export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(BookDetail));