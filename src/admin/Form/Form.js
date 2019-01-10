import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import GetIsbn from "./GetIsbn/GetIsbn";
import { withRouter } from 'react-router-dom';
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        author: '',
        description: '',
        isbn: '',
        image: '',
        no_of_copies: 0,
        available_copies: 0
    }
  }
  componentDidMount() {
      this.props.reset.subscribe(val => {
        this.resetForm();
      });
      if(this.props.value) {
        this.props.value.subscribe(val => {
          console.log(val);
          if (val ) {
            this.setState({
              title: val.title,
              author: val.author,
              description: val.description,
              image: val.image,
              isbn: val.isbn,
              available_copies: val.available_copies,
              no_of_copies :val.no_of_copies
            });
          }
        })
      }
  }

  handleChange = key => event => {
    console.log(event.target.value , key);
    switch(key) {
      case 'title': this.setState({ title: event.target.value });
      break;
      case 'author': this.setState({ author: event.target.value});
      break;
      case 'description': this.setState({description: event.target.value });
      break;
      case 'isbn': this.setState({isbn: event.target.value });
      break;
      case 'image': this.setState({image: event.target.value });
      break;
      case 'no_of_copies': this.setState({ no_of_copies: event.target.value });
      break
      case 'available_copies' : this.setState({ available_copies: event.target.value });
      break
      default: 
      break;
    }
  };

  extractInfo = (data) => {
      console.log('workinig');
    this.setState({
      title : data.volumeInfo.title, 
      author: data.volumeInfo.authors[0],
      description: data.volumeInfo.description,
      image: data.volumeInfo.imageLinks.thumbnail,
    });
    console.log(this.state.bookForm);   
  }
  resetForm = () => {
    this.setState({
      title: '',
      author: '',
      description: '',
      isbn: '',
      image: '',
      no_of_copies: 0,
      available_copies: 0
    });
  }    
  addBook = () => {
      this.props.submit(this.state);
  }
  render() {
    return (
        <Grid container justify='center'>
        <Grid item sm={12} md={6} xs={12}>
        <Grid container>
        <Grid item sm={12} md={6} xs={12} style={{paddingLeft: '5px', paddingRight: '5px'}}>
            <TextField
              disabled={this.props.loader}
              id="standard-name"
              label="Title"
              style={{ width: "100%"}}
              onChange={this.handleChange("title")} 
              value={this.state.title}
              margin="normal"
            />
          </Grid>
          <Grid item sm={12} md={6} xs={12} style={{paddingLeft: '5px', paddingRight: '5px'}}>
            <TextField
              disabled={this.props.loader}
              id="standard-name"
              label="Author"
              style={{ width: "100%" }}
              onChange={this.handleChange("author")}
              value={this.state.author}
              margin="normal"
            />
          </Grid>
          <Grid item sm={12} md={12} xs={12} style={{paddingLeft: '5px', paddingRight: '5px'}}>
            <TextField
              disabled={this.props.loader}
              id="standard-name"
              label="Description"
              style={{ width: "100%" }}
              onChange={this.handleChange("description")}
              value={this.state.description}
              margin="normal"
            />
          </Grid>
          <Grid container style={{paddingLeft: '5px', paddingRight: '5px'}}>
          <Grid item sm={(this.props.addForm)? 10 : 12} md={(this.props.addForm)? 10 : 12} xs={(this.props.addForm)? 10 : 12}>
            <TextField
              disabled={this.props.loader}
              id="standard-name"
              label="ISBN"
              style={{ width: "100%" }}
              onChange={this.handleChange("isbn")}
              value={this.state.isbn}              
              margin="normal"
            />

          </Grid>
          {
            (this.props.addForm)? 
              <Grid item sm={2} md={2} xs={4} >
              <GetIsbn setInfo={data => {this.extractInfo(data)}} isbn={this.state.isbn}></GetIsbn>
             </Grid> : ''
            
          }
          </Grid>
          <Grid item sm={12} md={12} xs={12} style={{paddingLeft: '5px', paddingRight: '5px'}}>
            <TextField
              disabled={this.props.loader}
              id="standard-name"
              label="Image"
              style={{ width: "100%" }}
              onChange={this.handleChange("image")}
              value={this.state.image}
              margin="normal"
              required
            />
          </Grid>
          <Grid item sm={12} md={12} xs={12} style={{paddingLeft: '5px', paddingRight: '5px'}}>
            <TextField
              disabled={this.props.loader}
              id="standard-name"
              label="No of copies"
              style={{ width: "100%" }}
              type="number"
              onChange={this.handleChange("no_of_copies")}
              value={this.state.no_of_copies}
              margin="normal"
            />
          </Grid>
          <Grid item sm={12} md={12} xs={12} style={{paddingLeft: '5px', paddingRight: '5px'}}>
            <TextField
              disabled={this.props.loader}
              id="standard-name"
              label="Available copies"
              style={{ width: "100%" }}
              type="number"
              onChange={this.handleChange("available_copies")}
              value={this.state.available_copies}
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container style={{marginTop: '1em'}}>
        <Grid item sm={12} md={12} xs={12}>
        
        { this.props.addForm ? <Button disabled={this.props.loader} variant="contained" color="primary" onClick={this.addBook}>Add</Button>: <Button disabled={this.props.loader} variant="contained" color="primary" onClick={this.addBook}>Update</Button> }
        <Button disabled={this.props.loader} variant="contained" color="secondary" onClick={() => {this.props.history.push('/admin')}} >Cancel</Button>
        </Grid>
        </Grid>
        </Grid>
        </Grid>

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
    // fetchIsbn: (isbn) => dispatch(fetchIsbn(isbn))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Form));
