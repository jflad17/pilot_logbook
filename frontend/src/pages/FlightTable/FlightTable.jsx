import React from 'react';
import { DateTime } from 'luxon';
import { useDeleteFlight } from '@api';
import { Box, Button, IconButton } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useFlight } from '@api';
import Table from '@components/Table/Table';

import EditModal from './EditModal';

import './FlightTable.css';
import { ConfirmPopup } from '@components/Form';


/**
 * Home Page Component
 * @returns {JSX}
 */

const FlightTable = () => {
  const deleteMutation = useDeleteFlight();
  const { data, isLoading } = useFlight();
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [editData, setEditData] = React.useState({});
  const [deleteID, setDeleteID] = React.useState(null);

  const handleClose = () => {
    setOpen(false);
    setEditData({});
  };

  const handleOpen = () => {
    setOpen(true);
    setEditData({});
  };

  React.useEffect(() => {
    if (isLoading === false) {
      const newRows = [];
      for (const d of data.sort((a, b) => new Date(b.date) - new Date(a.date))) {
        newRows.push({ id: d.id, ...d });
      }
      setRows([...newRows]);
    }
  }, [isLoading, data]);

  const onDeleteClick = (id) => {
    if (id) {
      deleteMutation.mutate(id);
    }
  };
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
          // const api = params.api;
          // const thisRow = {};
          // console.log('params', params);
          // api
          //     .getAllColumns()
          //     .filter((c) => c.field !== '__check__' && !!c)
          //     .forEach(
          //         (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
          //     );
          // console.log('all', api.getAllColumns().filter((c) => c.field !== '__check__' && !!c)
          //     .forEach((c) => console.log('c', c)));
          // console.log('thisRoW', thisRow);
          setOpen(true);
          setEditData(params.row);
        };

        return (
          <>
            <IconButton color="success" onClick={onClick}>
              <ModeEditIcon/>
            </IconButton>
            <IconButton color="error" onClick={(e) => {
              e.stopPropagation();
              setOpenDelete(true);
              setDeleteID(params.row.id);
            }}>
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
      renderCell: (params) => {
        return <div className='rowitem'>{DateTime.fromSQL(params.row.date).toLocaleString(DateTime.DATE_SHORT)}</div>;
      },
    },
    {
      headerName: 'Airline',
      field: 'airline_identifier',
      width: 150,
      renderCell: (params) => {
        return <div className='rowitem'>{params.row.airline_identifier.name}</div>;
      },
    },
    {
      headerName: 'Aircraft',
      field: 'aircraft',
      width: 150,
      renderCell: (params) => {
        return <div className="rowitem">{params.row.aircraft.name}</div>;
      },
    },
    {
      headerName: 'Aircraft Category',
      field: 'aircraft_category',
      width: 150,
      renderCell: (params) => {
        return <div className="rowitem">{params.row.aircraft_category.shortName}</div>;
      },
    },
    {
      headerName: 'Pilot Type',
      field: 'pilot_type',
      width: 150,
      renderCell: (params) => {
        return <div className='rowitem'>{params.row.pilot_type.shortName}</div>;
      },
    },
    {
      headerName: 'Tail',
      field: 'aircraftIdentity',
      width: 150,
    },
    {
      headerName: 'From',
      field: 'from_airport',
      width: 150,
      renderCell: (params) => {
        return <div className='rowitem'>{params.row.from_airport.code}</div>;
      },
    },
    {
      headerName: 'To',
      field: 'to_airport',
      width: 150,
      renderCell: (params) => {
        return <div className='rowitem'>{params.row.to_airport.code}</div>;
      },
    },
    {
      headerName: 'Total Flight Duration',
      field: 'totalFlightDuration',
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
      headerName: 'ATD Instrument',
      field: 'atdInstrument',
      width: 150,
    },
    {
      headerName: 'Hold',
      field: 'hold',
      width: 150,
    },
    {
      headerName: 'Full Flight Sim.',
      field: 'fullFlightSim',
      width: 150,
    },
    {
      headerName: 'Ground Trainer',
      field: 'groundTrainer',
      width: 150,
    },
    {
      headerName: 'Line Check',
      field: 'lineCheck',
      width: 150,
    },
    {
      headerName: 'Cross Country Time',
      field: 'crossCountryTime',
      width: 150,
    },
    {
      headerName: 'IOE',
      field: 'initialOperatingExperience',
      width: 150,
    },
    {
      headerName: 'Remarks',
      field: 'remarks',
      width: 150,
    },
    {
      headerName: 'Approaches',
      field: 'approaches',
      width: 150,
    },
    {
      headerName: 'Approach Type',
      field: 'approachType',
      width: 150,
    },
    {
      headerName: 'Other Pilot',
      field: 'crewMemberName',
      width: 150,
    },
    {
      headerName: 'Flight Number',
      field: 'flightNumber',
      width: 150,
    },
  ], []);


  return (
    <>
      <Box className='flight-table'>
        <Box
          className='flight-table-bg'>
          <center><h1>Flight Table</h1></center>
          <Button variant="contained" color="primary" onClick={handleOpen}>Add</Button>
          {isLoading === false ? <Table rows={rows} columns={columns} /> : null}
        </Box>
      </Box>

      <EditModal open={open} editData={editData} handleClose={handleClose} handleOpen={handleOpen} />
      <ConfirmPopup
        handleClose={() => setOpenDelete(false)}
        message={'Are you sure you want to delete?'}
        open={openDelete}
        onConfirm={() => onDeleteClick(deleteID)}
      />
    </>
  );
};

export default FlightTable;
