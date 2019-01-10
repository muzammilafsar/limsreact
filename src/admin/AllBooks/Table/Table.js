import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
    cursor: 'pointer'
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function BookTable(props) {
  const { classes } = props;

  return (
    <div style={{maxWidth: '100vw'}}>
      <Paper className={classes.root} >
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell numeric>Author</TableCell>
            <TableCell numeric>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.allBooks.map(row => {
            return (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell numeric>{row.author}</TableCell>
                <TableCell numeric><DeleteIcon  onClick={() => {props.delete(row)}} className={classes.icon} /><Edit onClick={() => {props.edit(row._id)}} className={classes.icon}></Edit></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  
    </div>
    );
}

BookTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookTable);