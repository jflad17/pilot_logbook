import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { PropTypes } from 'prop-types';

/**
 * @return {Component} Table Component
 */
function Table({ rows, columns }) {
  return (
    <>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid rows={rows} columns={columns}/>
      </div>
    </>
  );
}
Table.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
};

export default Table;
