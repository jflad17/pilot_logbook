import React from 'react';
import Table from '@customComponents/Table/Table';
import { Box } from '@material-ui/core';

import './FlightTable.css';

/**
 * Home Page Component
 * @returns {JSX}
 */

const FlightTable = () => {
  const columns = React.useMemo(() => [
    {
      headerName: 'Date',
      field: 'date',
      width: 150,
    },
    {
      headerName: 'Type',
      field: 'aircraftType',
      width: 150,
    },
    {
      headerName: 'Tail',
      field: 'aircraftIdentity',
      width: 150,
    },
    {
      headerName: 'From',
      field: 'fromAirport',
      width: 150,
    },
    {
      headerName: 'To',
      field: 'toAirport',
      width: 150,
    },
    {
      headerName: 'dayLanding',
      field: 'dayLanding',
      width: 150,
    },
    {
      headerName: 'nightLanding',
      field: 'nightLanding',
      width: 150,
    },
    {
      headerName: 'flightTime',
      field: 'flightTime',
      width: 150,
    },
    {
      headerName: 'nightTime',
      field: 'nightTime',
      width: 150,
    },
    {
      headerName: 'actualInstrument',
      field: 'actualInstrument',
      width: 150,
    },
    {
      headerName: 'simulatedInstrumentUnderHood',
      field: 'simulatedInstrumentUnderHood',
      width: 150,
    },
    {
      headerName: 'hold',
      field: 'hold',
      width: 150,
    },
    {
      headerName: 'simulator',
      field: 'simulator',
      width: 150,
    },
    {
      headerName: 'crossCountryTime',
      field: 'crossCountryTime',
      width: 150,
    },
    {
      headerName: 'totalFlightDuration',
      field: 'totalFlightDuration',
      width: 150,
    },
    {
      headerName: 'initialOperatingExperience',
      field: 'initialOperatingExperience',
      width: 150,
    },
    {
      headerName: 'crewMemberName',
      field: 'crewMemberName',
      width: 150,
    },
    {
      headerName: 'airlineIdentifier',
      field: 'airlineIdentifier',
      width: 150,
    },
    {
      headerName: 'flightNumber',
      field: 'flightNumber',
      width: 150,
    },
    {
      headerName: 'Aircraft Category',
      field: 'aircraft_category.shortName',
      width: 150,
    },
    {
      headerName: 'Pilot Type',
      field: 'pilot_type.shortName',
      width: 150,
    },
  ], []);

  const rows = [];

  return (
    <>
      <Box className='flight-table'>
        <Box
          className='flight-table-bg'>
          <center><h1>Flight Table</h1></center>
          <Table rows={rows} columns={columns} />
        </Box>
      </Box>
    </>
  );
};

export default FlightTable;
