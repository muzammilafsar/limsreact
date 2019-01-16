import React, { Component } from 'react';
import { connect} from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from './admin/admin';
import BookForm from './admin/BookForm/BookForm';
import BorrowedBooks from './admin/BorrowedBooks/BorrowedBooks';
import AdminHeader from './admin/AdminHeader/AdminHeader';
import EditBook from './admin/EditBook/EditBook';
import AdminSidenav from './admin/AdminSidebar/AdminSidenav';
import { Subject } from 'rxjs';
import Home from './user/Home/Home';
import BookDetail from './user/BookDetails/BookDetails';
import Header from './shared/header/header';
import UserBorrowedBooks from './user/BorrowedBooks/BorrowedBooks';
class App extends Component {
  sideNavSubject = new Subject();
  adminLoginSubject = new Subject();
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
          <Route path="/admin" render={() => {
            return <div>
              <AdminHeader sideNavSubject={this.sideNavSubject}></AdminHeader>
              <AdminSidenav sideNavSubject={this.sideNavSubject} admin={this.adminLoginSubject}></AdminSidenav>
              <Switch>
              <Route exact path="/admin" component={Admin}/>
              <Route exact path="/admin/addBook" component={BookForm}/>
              <Route exact path="/admin/borrowed" component={BorrowedBooks}/>
              <Route exact path="/admin/editbook/:id" component={EditBook}/>
            </Switch>
            </div>
          }}></Route>
          <Route path="/" render={() => {
            return <div>
              <Header sideNavSubject={this.sideNavSubject} admin={this.adminLoginSubject}></Header>
              <AdminSidenav sideNavSubject={this.sideNavSubject}admin={this.adminLoginSubject}></AdminSidenav>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/book/:id" component={BookDetail}/>
                <Route exact path="/borrowedbooks" component={UserBorrowedBooks}/>
              </Switch>
            </div>
          }}>
          </Route>

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    key: state
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch({type: 'increment'})
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
