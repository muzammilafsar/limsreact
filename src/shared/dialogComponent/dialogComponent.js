import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DialogComponent extends Component {
  render() {
    return (
      <div style={{ margin: "10px" }}>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{this.props.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.props.handleClose(false)}} color="primary" autoFocus>
              close
            </Button>
            {
              this.props.withAction ? 
              <Button onClick={() => {this.props.action();this.props.handleClose(false);}} color="secondary" autoFocus>
              Delete
            </Button>: ''
            }
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DialogComponent;
