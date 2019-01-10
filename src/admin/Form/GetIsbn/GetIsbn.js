import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect} from 'react-redux';
import { fetchIsbn } from '../../../store/actions/addBook.action';
import axios from 'axios';
import { UiLoader } from '../../../store/actions/ui.action';
class GetIsbn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedBook: {},
            fetchError: false,
            loading: false
        }
        this.getDetailsByIsbn.bind(this);
    }
    getDetailsByIsbn = () => {
        console.log('fetching isbn');
        this.props.startLoading();
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.props.isbn}`).then(val => val.data).then(
            val => {
                console.log(this.props);
                if(val.totalItems > 0) {
                    this.setState({fetchError: false, fetchedBook : val.items[0]});
                    this.props.setInfo(val.items[0]);
                } else {
                    this.setState({fetchError: true, dialogData: {title: 'Error', content: 'Unable to get Data'}, open: true});
                }
                this.props.stopLoading();
            }
        ).catch(err => {
            this.props.stopLoading();
            this.setState({fetchError: true, loading: false});
            this.setState({fetchError: true, dialogData: {title: 'Error', content: 'Unable to get Data'}, open: true});
        })

    }
  render() {
    return (
        <Button variant="outlined" color="primary" onClick={this.getDetailsByIsbn}>Get Details{this.props.loader}</Button>
    );
  }
}
const mapStateToProps = state => {
    return {
      addBook: state.addBook.fetchedBook,
      loader: JSON.stringify(state.UiReducer.loader)
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      fetchIsbn: (isbn) => dispatch(fetchIsbn(isbn)),
      startLoading : () => dispatch(UiLoader(true)),
      stopLoading : () => dispatch(UiLoader(false))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(GetIsbn);
