import React from 'react';
import Table from '@customComponents/Table/Table';
import { Box, Button, IconButton } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import './FlightTable.css';

import AddModal from './AddModal';
import { useFlight } from '@api/flight';

/**
 * Home Page Component
 * @returns {JSX}
 */

const FlightTable = () => {
  const { data, isLoading } = useFlight();
  console.log('data isloading', data, isLoading);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    if (isLoading === false) {
      const newRows = [];
      for (const d of data) {
        newRows.push({ id: d.idFlight, ...d });
      }
      setRows([...newRows]);
    }
  }, [isLoading, data]);

  const columns = React.useMemo(() => [
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 120,
      disableColumnMenu: true,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log(params);
          const api = params.api;
          const thisRow = {};

          api
              .getAllColumns()
              .filter((c) => c.field !== '__check__' && !!c)
              .forEach(
                  (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
              );

          return alert(JSON.stringify(thisRow, null, 4));
        };

        return (
          <>
            <IconButton color="success" onClick={onClick}>
              <ModeEditIcon/>
            </IconButton>
            <IconButton color="error" onClick={onClick}>
              <DeleteIcon/>
            </IconButton>
          </>
        );
      },
    },
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


  return (
    <>
      <Box className='flight-table'>
        <Box
          className='flight-table-bg'>
          <center><h1>Flight Table</h1></center>
          {isLoading === false ? <Table rows={rows} columns={columns} /> : null}
          <Button variant="contained" color="primary" onClick={handleOpen}>Test</Button>
        </Box>
      </Box>

      <AddModal open={open} handleClose={handleClose} handleOpen={handleOpen} />
    </>
  );
};

export default FlightTable;
