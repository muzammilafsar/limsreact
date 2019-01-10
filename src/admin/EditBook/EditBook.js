import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { fetchIsbn } from "../../store/actions/addBook.action";
import  DialogComponent  from '../../shared/dialogComponent/dialogComponent';
import Form from '../Form/Form';
import axios from 'axios';
import { serviceUrl } from "../../app.constant";
import {Subject, BehaviorSubject} from 'rxjs';
import {withRouter} from 'react-router-dom';
import { UiLoader } from "../../store/actions/ui.action";
class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dialogData: {
        title: '',
        content: ''
      },
      resetSubject: new Subject(),
      bookSubject: new BehaviorSubject()
    }
  }
  handleDialog = (val) => {
    this.setState({ open: val });
  };
  componentWillMount() {
      if(this.props.match.params.id) {
        this.getBook(this.props.match.params.id);
      } else {
          this.props.history.push('/admin');
      }
  }
  getBook = (id) => {
      this.props.startLoading();
    axios.post(`${serviceUrl.url}${serviceUrl.admin.getbook}`, {id}).then(val => val.data).then(val => {
        if(val.status === 200) {
            this.state.bookSubject.next(val.books);

        } else {
          this.setState({fetchError: true, dialogData: {title: 'Error', content: 'Something went worng'}, open: true});
        }
        this.props.stopLoading();
      }).catch(err => {
        this.setState({fetchError: true, dialogData: {title: 'Error', content: 'Something went worng'}, open: true});
        this.props.stopLoading();
    }); 
  }
  saveBook = (book) => {
    if(book.title !== '' && book.author !== '' && book.description !== ''  && book.image !== '' && book.isbn !== '' && book.no_of_copies !== '' && book.available_copies !== '') {
      book.available_copies = parseInt(book.available_copies);
      book.copies = parseInt(book.copies);
      let data = book;
      book.id = this.props.match.params.id;
      this.props.startLoading();
      axios.post(`${serviceUrl.url}${serviceUrl.admin.updatebook}`, data).then(val => val.data).then(val => {
        if(val.status === 200) {
          this.setState({fetchError: false, dialogData: {title: 'Success', content: 'Book Updated Successfully'}, open: true});
        //   this.props.history.push('/admin');
        } else {
          this.setState({fetchError: true, dialogData: {title: 'Error', content: 'Something went worng'}, open: true});
        }
        this.props.stopLoading();
      }).catch(err => {
        this.setState({fetchError: true, dialogData: {title: 'Error', content: 'Something went worng'}, open: true});
        this.props.stopLoading();        
    }) 
    } else {
    this.setState({fetchError: true, dialogData: {title: 'Error', content: 'All fields are mandatory.'}, open: true});
    }   
  }
  render() {
    return (
      <div style={{ margin: "10px" }}>
        <Grid container justify='center'>
          <Grid item><Typography variant="h3" gutterBottom>
        Update Book
      </Typography></Grid>  
        </Grid>
        <Form submit={this.saveBook} addForm={false} reset={this.state.resetSubject} value={this.state.bookSubject}/>
        <DialogComponent title={this.state.dialogData.title} content={this.state.dialogData.content} handleClose={() => {this.handleDialog(false); this.props.history.push('/admin');}} open={this.state.open}></DialogComponent>
      </div>
    );

  }
}
const mapStateToProps = state => {
  return {
    addBook: state.addBook.fetchedBook,
    loader: state.UiReducer.loader
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchIsbn: (isbn) => dispatch(fetchIsbn(isbn)),
    startLoading : () => dispatch(UiLoader(true)),
    stopLoading : () => dispatch(UiLoader(false))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditBook));
