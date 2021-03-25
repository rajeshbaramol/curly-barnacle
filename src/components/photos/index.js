import {
  Button,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPhotos, onChange, deleteItem } from './action';
import { withStyles } from '@material-ui/core/styles';
const useStyles = {
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
};
const columns = [
  { id: 'id', label: 'id', minWidth: 50 },
  {
    id: 'title',
    label: 'title',
    minWidth: 170,
  },
  { id: 'thumbnailUrl', label: 'thumbnailUrl', minWidth: 170 },
  {
    id: 'url',
    label: 'url',
    minWidth: 170,
  },
];
class Photos extends Component {
  componentDidMount() {
    this.props.getPhotos({
      _start: this.props.photoData.page,
      _limit: this.props.photoData.rowsPerPage,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.photoData.page !== prevProps.photoData.page ||
      this.props.photoData.rowsPerPage !== prevProps.photoData.rowsPerPage
    ) {
      this.props.getPhotos({
        _start: this.props.photoData.page,
        _limit: this.props.photoData.rowsPerPage,
      });
    }
  }
  handleChangePage = (e, newPage) => {
    this.props.onChange({ key: 'page', value: newPage });
  };
  componentWillUnmount() {}
  handleChangeRowsPerPage = (e, newPage) => {
    this.props.onChange({ key: 'rowsPerPage', value: e.target.value });
  };
  onDelete = (e, r) => {
    this.props.deleteItem(r);
    this.props.getPhotos({
      _start: this.props.photoData.page,
      _limit: this.props.photoData.rowsPerPage,
    });
  };
  onEdit = () => {};
  onChange=(e,row)=>{
      let data=this.props.photoData.photoList.map(x=>{
          if(x.id===row.id)
          return row
          return x
      })
      this.props.onChange({key:'photoList',value:data})
  }
  
  render() {
    let { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.photoList.map((row) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={row.albumId}
                  >
                    {columns.map((column) => {
                      return (
                        <CustomTableCell {...this.props} {...{ row,column, onChange:this.onChange ,isEdit:this.props.photoData.edit[row.id]}}></CustomTableCell>
                      );
                    })}
                    {this.props.photoData.edit[row.id]&&<Button>Save</Button>}
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={(e) => this.onDelete(e, row)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={(e) =>{
                          let obj=this.props.photoData.edit;
                          obj[row.id]=true;
                        this.props.onChange({
                          key: 'edit',
                          value:obj,
                        })
                      }}
                    >
                      edit
                    </Button>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={100}
          rowsPerPage={this.props.photoData.rowsPerPage}
          page={this.props.photoData.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

Photos.propTypes = {};
const mapStateToProps = (state) => ({
  photoList: state.photos.get('photoList') || [],
  photoData: state.photos.toJS(),
});

export default connect(mapStateToProps, {
  getPhotos,
  onChange,
  deleteItem,
})(withStyles(useStyles)(Photos));
const CustomTableCell = (props) => {
    let {row,column,isEdit}=props
    return (
      <TableCell align='left' className={props.classes.tableCell}>
        {isEdit ? (
          <Input
            value={row[column.id]}
            name={column.label}
            onChange={(e) => onChange(e, row)}
            className={props.classes.input}
          />
        ) : (
          row[column.label]
        )}
      </TableCell>
    );
  };