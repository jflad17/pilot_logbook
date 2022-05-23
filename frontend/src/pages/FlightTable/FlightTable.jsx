import React from 'react';
import Table from '@components/Table/Table';
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
      headerName: 'Day Landing',
      field: 'dayLanding',
      width: 150,
    },
    {
      headerName: 'Night Landing',
      field: 'nightLanding',
      width: 150,
    },
    {
      headerName: 'Flight Time',
      field: 'flightTime',
      width: 150,
    },
    {
      headerName: 'Night Time',
      field: 'nightTime',
      width: 150,
    },
    {
      headerName: 'Actual Instrument',
      field: 'actualInstrument',
      width: 150,
    },
    {
      headerName: 'Sim. Instr. Under Hood',
      field: 'simulatedInstrumentUnderHood',
      width: 150,
    },
    {
      headerName: 'Hold',
      field: 'hold',
      width: 150,
    },
    {
      headerName: 'Simulator',
      field: 'simulator',
      width: 150,
    },
    {
      headerName: 'Cross Country Time',
      field: 'crossCountryTime',
      width: 150,
    },
    {
      headerName: 'Total Flight Duration',
      field: 'totalFlightDuration',
      width: 150,
    },
    {
      headerName: 'IOE',
      field: 'initialOperatingExperience',
      width: 150,
    },
    {
      headerName: 'Other Pilot',
      field: 'crewMemberName',
      width: 150,
    },
    {
      headerName: 'Airline',
      field: 'airlineIdentifier',
      width: 150,
    },
    {
      headerName: 'Flight Number',
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
