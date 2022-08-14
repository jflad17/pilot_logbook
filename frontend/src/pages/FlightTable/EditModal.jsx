import React from 'react';
import { useForm } from 'react-hook-form';
import { PropTypes } from 'prop-types';

import
{
  object,
  number,
  bool,
  date,
  string,
} from 'yup';
import { format } from 'date-fns';
import mapValues from 'lodash/mapValues';
import { Paper, Button } from '@mui/material';

import
{
  useAircraftCategory,
  useAirlineIdentifier,
  usePilotType,
  // useCreateFlight,
  // useUpdateFlight,
} from '@api';
import { Modal } from '@components';
import { AutoComplete,
  Datepicker, Input, Switcher,
} from '@components/Form';
import useYupResolver from '@services/useYupResolver';
import { fetchUser } from '../../Auth';


/**
 * Home Page Component
 * @returns {JSX}
 */

const EditModal = ({ open, handleClose, handleOpen, editData }) => {
  console.log('editdata', editData);
  const aircraftCategory = useAircraftCategory();
  const airlineIdentifier = useAirlineIdentifier();
  const pilotType = usePilotType();

  // const createFlightMutation = useCreateFlight();
  // const updateFlightMutation = useUpdateFlight();

  const defaultValues = React.useMemo(() => {
    return {
      date: '',
      aircraftType: '',
      aircraftIdentity: '',
      fromAirport: '',
      toAirport: '',
      departure: '',
      arrival: '',
      totalFlightDuration: '',
      dayLanding: '',
      nightLanding: '',
      actualInstrument: '',
      simulatedInstrumentUnderHood: '',
      atdInstrument: '',
      hold: false,
      fullFlightSim: '',
      groundTrainer: '',
      lineCheck: false,
      crossCountryTime: '',
      initialOperatingExperience: false,
      remarks: '',
      approaches: '',
      approachType: '',
      crewMemberName: '',
      flightNumber: '',
      AirlineIdentifier_id: '',
      AircraftCategory_id: '',
      PilotType_id: '',
    };
  }, []);

  const validationSchema = object().shape({
    date: date().required(),
    aircraftType: string().required(),
    aircraftIdentity: string().required(),
    fromAirport: string().required(),
    toAirport: string().required(),
    departure: string().required(),
    arrival: string().required(),
    totalFlightDuration: number().required().test(
        'is-decimal',
        'Invalid decimal',
        (value) => (value + '').match(/^[0-9]*(\.[0-9]{0,2})?$/)),
    dayLanding: number(),
    nightLanding: number(),
    actualInstrument: number().test(
        'is-decimal',
        'Invalid decimal',
        (value) => (value + '').match(/^[0-9]*(\.[0-9]{0,2})?$/)),
    simulatedInstrumentUnderHood: number().test(
        'is-decimal',
        'Invalid decimal',
        (value) => (value + '').match(/^[0-9]*(\.[0-9]{0,2})?$/)),
    atdInstrument: number().test(
        'is-decimal',
        'Invalid decimal',
        (value) => (value + '').match(/^[0-9]*(\.[0-9]{0,2})?$/)),
    hold: bool(),
    fullFlightSim: number().test(
        'is-decimal',
        'Invalid decimal',
        (value) => (value + '').match(/^[0-9]*(\.[0-9]{0,2})?$/)),
    groundTrainer: number().test(
        'is-decimal',
        'Invalid decimal',
        (value) => (value + '').match(/^[0-9]*(\.[0-9]{0,2})?$/)),
    lineCheck: bool(),
    crossCountryTime: number(),
    initialOperatingExperience: bool(),
    remarks: string().nullable(),
    approaches: number(),
    approachType: string().nullable(),
    crewMemberName: string().required(),
    flightNumber: string().required(),
    AirlineIdentifier_id: number().required('Number required'),
    AircraftCategory_id: number().required(),
    PilotType_id: number().required(),
  });

  const resolver = useYupResolver(validationSchema);
  const {
    // register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues,
    shouldUnregister: false,
  });

  React.useEffect(() => {
    if (Object.keys(editData).length === 0) {
      reset(defaultValues);
    } else {
      if (open && Object.keys(editData).length > 0) {
        console.log('editData', editData);
        mapValues(editData, (value, key) => {
          setValue(key, value);
        });
      }
    }
  }, [editData]);

  const Buttons = () => {
    return (
      <>
        <Button onClick={handleClose} >
          Cancel
        </Button>
        <Button type="submit">
          {Object.keys(editData).length > 0 ? 'Save changes' : 'Add'}
        </Button>
      </>
    );
  };

  const onSubmitHandler = (data) => {
    console.log('errors', errors);
    console.log('data', data);
    data.User_id = fetchUser().id;

    // if (editData) {
    //   data.id = editData.id;
    //   updateFlightMutation.mutate(data);
    // } else {
    //   createFlightMutation.mutate(data);
    // }
  };

  const Content = () => {
    return (
      <>
        <Paper>
          <AutoComplete
            control={control}
            label='Airline'
            name='AirlineIdentifier_id'
            data={airlineIdentifier.data}
            isLoading={airlineIdentifier.isLoading}
            getOptionLabel={(option) => option.name}
            // renderOption={(props, option, state) => (
            //   <span key={`${option.name}`}>
            //     {option.name}
            //   </span>
            // )}
          />
          <Datepicker
            control={control}
            label='Date'
            name="date"
            defaultValue={!editData ? format(new Date(), 'MM/dd/yyyy') : null}
          />
          <Input
            control={control}
            type="text"
            name="aircraftType"
            label="Aircraft Type"
          />
          <Input
            control={control}
            type="text"
            name="fromAirport"
            label="From Airport"
          />
          <Input
            control={control}
            type="text"
            name="toAirport"
            label="To Airport"
          />
          <Input
            control={control}
            type="time"
            name="departure"
            label="Departure"
          />
          <Input
            control={control}
            type="time"
            name="arrival"
            label="Arrival"
          />
          <Input
            control={control}
            type="number"
            name="dayLanding"
            label="Day Landing"
          />
          <Input
            control={control}
            type="number"
            name="nightLanding"
            label="Night Landing"
          />
          <Input
            control={control}
            type="number"
            step=".01"
            name="actualInstrument"
            label="Actual Instrument"
          />
          <Input
            control={control}
            type="number"
            step=".01"
            name="simulatedInstrumentUnderHood"
            label="Sim. Instrument UH"
          />
          <Input
            control={control}
            type="number"
            step=".01"
            name="atdInstrument"
            label="ATD Instrument"
          />
          <Input
            control={control}
            type="number"
            step=".01"
            name="fullFlightSim"
            label="Full Flight Sim"
          />
          <Input
            control={control}
            type="number"
            step=".01"
            name="groundTrainer"
            label="Ground Trainer"
          />
          <Input
            control={control}
            type="number"
            step=".01"
            name="crossCountryTime"
            label="Cross-Country Time"
          />
          <Input
            control={control}
            type="number"
            step=".01"
            name="totalFlightDuration"
            label="Flight Duration"
          />
          <Switcher
            control={control}
            label="IOE"
            name="initialOperatingExperience"
          />
          <Switcher
            control={control}
            label="Hold"
            name="hold"
          />
          <Switcher
            control={control}
            label="Line Check"
            name="lineCheck"
          />
          <Input
            control={control}
            type="text"
            name="flightNumber"
            label="Flight Number"
          />
          <Input
            control={control}
            type="text"
            name="remarks"
            label="Remarks"
            multiline
            rows={2}
            maxRows={4}
          />
          <Input
            control={control}
            type="number"
            name="approaches"
            label="Approaches"
          />
          <Input
            control={control}
            type="text"
            name="approachType"
            label="Approach Type"
            multiline
            rows={2}
            maxRows={4}
          />
          <AutoComplete
            control={control}
            label='Pilot Type'
            name='PilotType_id'
            data={pilotType.data}
            isLoading={pilotType.isLoading}
            getOptionLabel={(option) => `${option.shortName}`}
          />
          <AutoComplete
            control={control}
            label='Aircraft'
            name='AircraftCategory_id'
            data={aircraftCategory.data}
            isLoading={aircraftCategory.isLoading}
            getOptionLabel={(option) => `${option.shortName}`}
          />
        </Paper>
      </>
    );
  };

  return (
    <>
      <Modal
        open={open}
        Content={Content}
        handleClickOpen={handleOpen}
        handleClose={handleClose}
        title={Object.keys(editData).length > 0 ? 'Edit Flight' : 'Add Flight'}
        Buttons={Buttons}
        useForm={true}
        onSubmit={handleSubmit(onSubmitHandler)}
      />
    </>
  );
};

export default EditModal;

EditModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleOpen: PropTypes.func,
  editData: PropTypes.object,
};
