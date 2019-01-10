import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { fetchIsbn } from "../../store/actions/addBook.action";
import  DialogComponent  from '../../shared/dialogComponent/dialogComponent';
import axios from 'axios';
import { serviceUrl } from "../../app.constant";
import BorrowedTable from './BorrowedTable/BorrowedTable';
import { UiLoader } from "../../store/actions/ui.action";

class BorrowedBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dialogData: {
            title: '',
            content: ''
          },
          open: false,
          allBooks: []
    }
  }
  componentDidMount() {
      this.getBooks();
  }
  handleDialog = (val) => {
    this.setState({ open: val });
  };
  deleteBook = (id) => {
    console.log('delete', id);
  }
  editBook = (id) => {
    console.log('edit', id);
  }
  getBooks = (book) => {
      this.props.startLoading();
      axios.get(`${serviceUrl.url}${serviceUrl.admin.allborrowedbooks}`).then(val => val.data).then(val => {
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
            <Grid item sm={12} md={12} lg={12}>
                <BorrowedTable allBorrowed={this.state.allBooks} delete={this.deleteBook} edit={this.editBook}></BorrowedTable>
            </Grid>
          </Grid>
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
    fetchIsbn: (isbn) => dispatch(fetchIsbn(isbn)),
    startLoading : () => dispatch(UiLoader(true)),
    stopLoading : () => dispatch(UiLoader(false))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BorrowedBooks);
