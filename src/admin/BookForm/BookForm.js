import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { fetchIsbn } from "../../store/actions/addBook.action";
import  DialogComponent  from '../../shared/dialogComponent/dialogComponent';
import Form from '../Form/Form';
import axios from 'axios';
import { serviceUrl } from "../../app.constant";
import {Subject} from 'rxjs';
class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dialogData: {
        title: '',
        content: ''
      },
      resetSubject: new Subject()
    }
  }
  handleDialog = (val) => {
    this.setState({ open: val });
  };

  addBook = (book) => {
    if(book.title !== '' && book.author !== '' && book.description !== ''  && book.image !== '' && book.isbn !== '' && book.no_of_copies !== '' && book.available_copies !== '') {
      book.available_copies = parseInt(book.available_copies);
      book.copies = parseInt(book.copies);
      let data = book;
      axios.post(`${serviceUrl.url}${serviceUrl.admin.addBook}`, data).then(val => val.data).then(val => {
        if(val.status === 200) {
          this.setState({fetchError: false, dialogData: {title: 'Success', content: 'Book Added Successfully'}, open: true});
          this.state.resetSubject.next();
        } else {
          this.setState({fetchError: true, dialogData: {title: 'Error', content: 'Something went worng'}, open: true});
        }
      }).catch(err => {
        this.setState({fetchError: true, dialogData: {title: 'Error', content: 'Something went worng'}, open: true});
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
        Add to Library
      </Typography></Grid>  
        </Grid>
        <Form submit={this.addBook} addForm={true} reset={this.state.resetSubject}/>
        <DialogComponent title={this.state.dialogData.title} content={this.state.dialogData.content} handleClose={() => {this.handleDialog(false)}} open={this.state.open}></DialogComponent>
      </div>
    );

  }
}
const mapStateToProps = state => {
  return {
    addBook: state.addBook.fetchedBook
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchIsbn: (isbn) => dispatch(fetchIsbn(isbn))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);
