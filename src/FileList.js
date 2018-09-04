import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

let id = 0;

function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein
  };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default class FileList extends Component {

  roundToPlace = (place, value) =>
    Math.floor(value * (10 ** place)) / (10 ** place);

  renderFiles = () => {
    return this.props.files.map(file => {
      const { name, size: sizeInBytes } = file;
      let size = {
        value: this.roundToPlace(2, sizeInBytes / (2 ** 20)),
        unit: 'MB'
      }; // Converts to MB
      if (size.value === 0) { // If very small convert to KB
        size = {
          value: this.roundToPlace(2, sizeInBytes / (2 ** 10)),
          unit: 'KB'
        }
      }
      return (
        <TableRow key={name}>
          <TableCell>{name}</TableCell>
          <TableCell>{size.value} {size.unit}</TableCell>
        </TableRow>
      );
    })
  }

  render() {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell>File Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.renderFiles()}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}
