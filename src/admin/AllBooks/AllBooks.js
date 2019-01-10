import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Typography } from '@material-ui/core';
import { fetchIsbn } from "../../store/actions/addBook.action";
import  DialogComponent  from '../../shared/dialogComponent/dialogComponent';
import axios from 'axios';
import { serviceUrl } from "../../app.constant";
import BookTable from './Table/Table';
import { UiLoader } from "../../store/actions/ui.action";
import { withRouter } from 'react-router-dom';

class AllBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dialogData: {
            title: '',
            content: ''
          },
          open: false,
          withAction: false, 
          allBooks: [],
          bookToDelete: {}
    }
  }
  componentDidMount() {
      this.getBooks();
  }
  handleDialog = (val) => {
    this.setState({ open: val });
  };
  deleteBook = (book) => {
    console.log('delete', book);
    this.setState({ open: true, dialogData: {content: `Are you sure you want to delete "${book.title}"`, title: 'DELETE BOOK'}, withAction: true, bookToDelete: book}, );
  }
  confirmDelete = () => {
    this.setState({withAction: false});
    axios.post(`${serviceUrl.url}${serviceUrl.admin.deletebook}`, {id: this.state.bookToDelete._id }).then(val => val.data).then(val => {
      if(val.status === 200) {
        this.setState({fetchError: true, dialogData: {title: 'Success', content: 'Book Deleted Successfully'}, open: true});
        this.getBooks();
      } else {
        this.setState({fetchError: true, dialogData: {title: 'Error', content: 'Something went worng'}, open: true});
      }
      this.props.stopLoading();
    }).catch(err => {
      this.setState({fetchError: true, dialogData: {title: 'Error', content: 'Something went worng'}, open: true});
      this.props.stopLoading();
    }) 
  }
  editBook = (id) => {
    this.props.history.push(`/admin/editbook/${id}`);
    console.log('edit', id);
  }
  getBooks = (book) => {
      this.props.startLoading();
      axios.get(`${serviceUrl.url}${serviceUrl.admin.allBooks}`).then(val => val.data).then(val => {
        if(val.status === 200) {
          this.setState({fetchError: false, allBooks: val['books']});
        } else {
          this.setState({fetchError: true, dialogData: {title: 'Error', content: 'Something went worng'}, open: true});
        }
        this.props.stopLoading();
      }).catch(err => {
        this.setState({fetchError: true, dialogData: {title: 'Error', content: 'Something went worng'}, open: true});
        this.props.stopLoading();
      }) 
    }   
  
  render() {
    return (
      <div>
          <Grid container justify="center">
          <Grid item direction='row' >
          <Grid container justify="center">
          <Typography component="h2" variant="display3" gutterBottom >
            All Books
          </Typography>
          </Grid>
          <Grid container>
                <BookTable   allBooks={this.state.allBooks} delete={this.deleteBook} edit={this.editBook}></BookTable>
          </Grid>
          </Grid>
          </Grid>
          <DialogComponent withAction={this.state.withAction} action={this.confirmDelete} title={this.state.dialogData.title} content={this.state.dialogData.content} handleClose={() => {this.handleDialog(false)}} open={this.state.open}></DialogComponent>
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
    fetchIsbn: (isbn) => dispatch(fetchIsbn(isbn)),
    startLoading : () => dispatch(UiLoader(true)),
    stopLoading : () => dispatch(UiLoader(false))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AllBooks));
