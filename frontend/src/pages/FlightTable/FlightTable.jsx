import React from 'react';
import { DateTime } from 'luxon';
import { useDeleteFlight } from '@api';
import { Box,
  Button,
  IconButton,
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

// import { toast } from 'react-toastify';

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
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [editData, setEditData] = React.useState({});
  const [deleteID, setDeleteID] = React.useState(null);
  // const [selectionModel, setSelectionModel] = React.useState([]);

  const handleClose = () => {
    setOpenEdit(false);
    setEditData({});
  };

  const handleOpen = () => {
    setOpenEdit(true);
    // setEditData({});
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
  // const onDeleteToggle = (e) => {
  //   e.stopPropagation();
  //   setOpenDelete(true);
  // };
  // const onEditClick = (e) => {
  //   console.log('OPEN EDIT', openEdit);
  //   setOpenEdit(true);
  //   // e.stopPropagation();
  //   console.log('OPEN EDIT 2', openEdit);
  // };

  // const onSelectClick = async (selection) => {
  //   let result = [];
  //   if (selection.length > 1) {
  //     const selectionSet = new Set(selectionModel);
  //     result = selection.filter((s) => !selectionSet.has(s));
  //     // setSelectionModel(result);
  //   } else {
  //     result = selection;
  //   }
  //   await setSelectionModel(result);
  //   if (result.length > 0) {
  //     if (result.length > 1) {
  //       toast.error('Please select one entry');
  //       setEditData({});
  //       setSelectionModel([]);
  //     } else {
  //       const editDataResult = data.filter((d) => d.id === result[0]);
  //       if (editDataResult.length > 1) {
  //         toast.error('Please select one entry');
  //         setEditData({});
  //         setSelectionModel([]);
  //       } else {
  //         console.log('editDATARESULT', editDataResult);
  //         setEditData(editDataResult[0]);
  //       }
  //     }
  //   }
  //   // let resultId = 0;
  //   // if (selection.length > 1) {
  //   //   console.log('SEELCTION', selection);
  //   //   const selectionSet = new Set(selectionModel);
  //   //   resultId = selection.filter((s) => !selectionSet.has(s));
  //   //   console.log('resid', resultId);
  //   // } else {
  //   //   resultId = selection;
  //   // }
  //   // const result = data.filter((d) => d.id === resultId[0]);
  //   // let editDataResult = {};
  //   // if (result.length > 0) {
  //   //   editDataResult = result[0];
  //   // }
  //   // console.log('RESULT', result);
  //   // setEditData(selectionModel[0]);
  //   // const selectedIDs = new Set(ids);
  //   // const editData = data.filter((row) => selectedIDs.has(row.id));
  //   // console.log(editData);
  //   // if (editData.length > 0) {
  //   //   setEditData(editData[0]);
  //   // // console.log('EEEEDOTROW', e.row);
  //   // // setEditData(e.row);
  //   // // setDeleteID(e.row.id);
  //   // }
  //   console.log('EDITDATA', editData);
  // };

  // const onClearClick = () => {
  //   setEditData({});
  // };

  const onAddClick = () => {
    setEditData({});
    setOpenEdit(true);
  };
  const columns = React.useMemo(() => [
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 80,
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
          setOpenEdit(true);
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
        return <div className="rowitem">
          {params.row.aircraft ? params.row.aircraft.name : ''}</div>;
      },
    },
    {
      headerName: 'Aircraft Category',
      field: 'aircraft_category',
      width: 150,
      renderCell: (params) => {
        return <div className="rowitem">
          {params.row.aircraft_category ? params.row.aircraft_category.shortName : ''}
        </div>;
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
        return <div className='rowitem'>
          {params.row.from_airport ? params.row.from_airport.code : ''}
        </div>;
      },
    },
    {
      headerName: 'To',
      field: 'to_airports',
      width: 150,
      renderCell: (params) => {
        let newCodes = '';
        console.log(params.row.to_airports);
        for (let index = 0; index < params.row.to_airports.length; index++) {
          const element = params.row.to_airports[index];
          newCodes += element.code;
          if (index + 1 < params.row.to_airports.length) {
            newCodes += '-';
          }
        }
        return <div className='rowitem'>{newCodes}</div>;
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
      hide: true,
    },
    {
      headerName: 'Sim. Instr. Under Hood',
      field: 'simulatedInstrumentUnderHood',
      width: 150,
      hide: true,
    },
    {
      headerName: 'ATD Instrument',
      field: 'atdInstrument',
      width: 150,
      hide: true,
    },
    {
      headerName: 'Hold',
      field: 'hold',
      width: 150,
      hide: true,
    },
    {
      headerName: 'Full Flight Sim.',
      field: 'fullFlightSim',
      width: 150,
      hide: true,
    },
    {
      headerName: 'Ground Trainer',
      field: 'groundTrainer',
      width: 150,
      hide: true,
    },
    {
      headerName: 'Line Check',
      field: 'lineCheck',
      width: 150,
      hide: true,
    },
    {
      headerName: 'Cross Country Time',
      field: 'crossCountryTime',
      width: 150,
      hide: true,
    },
    {
      headerName: 'IOE',
      field: 'initialOperatingExperience',
      width: 150,
      hide: true,
    },
    {
      headerName: 'Remarks',
      field: 'remarks',
      width: 150,
      hide: true,
    },
    {
      headerName: 'Approaches',
      field: 'approaches',
      width: 150,
      hide: true,
    },
    {
      headerName: 'Approach Type',
      field: 'approachType',
      width: 150,
      hide: true,
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
          <Button variant="contained" color="primary" onClick={onAddClick}>Add</Button>
          {/* <Button variant="contained" color="success" onClick={onEditClick}
            disabled={Object.keys(editData).length === 0}>Edit</Button>
          <Button variant="contained" color="error" onClick={onDeleteToggle}
            disabled={Object.keys(editData).length === 0}>Delete</Button>
          <Button variant="contained" color="secondary"
            onClick={onClearClick}
            disabled={Object.keys(editData).length === 0}>Clear Selected</Button> */}
          {isLoading === false ?
          <Table
            rows={rows}
            columns={columns}
            // checkboxSelection
            // selectionModel={selectionModel}
            hideFooterSelectedRowCount
            // onSelectionModelChange={(selection) => onSelectClick(selection)}
          /> : null}
        </Box>
      </Box>

      <EditModal
        open={openEdit}
        editData={editData}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
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
