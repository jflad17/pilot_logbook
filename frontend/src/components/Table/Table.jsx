import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { PropTypes } from 'prop-types';

/**
 * @return {Component} Table Component
 */
function Table({ rows, columns, selectionModel=undefined, ...props }) {
  return (
    <>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} selectionModel={selectionModel} {...props} />
      </div>
    </>
  );
}
Table.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  selectionModel: PropTypes.any,
};

export default Table;
