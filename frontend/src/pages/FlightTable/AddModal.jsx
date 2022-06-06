import React from 'react';
import { useForm } from 'react-hook-form';
import { PropTypes } from 'prop-types';

import
{
  object,
  number,
  // date,
  // bool,
  // string,
} from 'yup';
import { format } from 'date-fns';
import { Paper, Button } from '@mui/material';

import { useAircraftCategory, useAirlineIdentifier, usePilotType } from '@api';
import { Modal } from '@components';
import { AutoComplete, Datepicker, Input, Switcher } from '@components/Form';
import useYupResolver from '@services/useYupResolver';


/**
 * Home Page Component
 * @returns {JSX}
 */

const AddModal = ({ open, handleClose, handleOpen }) => {
  const aircraftCategory = useAircraftCategory();
  const airlineIdentifier = useAirlineIdentifier();
  const pilotType = usePilotType();
  const defaultValues = React.useMemo(() => {
    return {
      // date: '',
      // aircraftType: '',
      // aircraftIdentity: '',
      // fromAirport: '',
      // toAirport: '',
      // departure: '',
      // arrival: '',
      // dayLanding: '',
      // nightLanding: '',
      // actualInstrument: '',
      // simulatedInstrumentUnderHood: '',
      // hold: '',
      // simulator: '',
      // crossCountryTime: '',
      // totalFlightDuration: '',
      // initialOperatingExperience: '',
      // crewMemberName: '',
      // flightNumber: '',
      // AirlineIdentifier_idAirlineIdentifier: '',
      AircraftCategory_idAircraftCategory: '',
      // PilotType_idPilotType: '',
    };
  }, []);

  const validationSchema = object().shape({
    // date: date().required(),
    // aircraftType: string().required(),
    // aircraftIdentity: string().required(),
    // fromAirport: string().required(),
    // toAirport: string().required(),
    // departure: string().required(),
    // arrival: string().required(),
    // dayLanding: number(),
    // nightLanding: number(),
    // actualInstrument: number(),
    // simulatedInstrumentUnderHood: number(),
    // hold: bool(),
    // simulator: number(),
    // crossCountryTime: number(),
    // totalFlightDuration: number(),
    // initialOperatingExperience: bool(),
    // crewMemberName: string().required(),
    // flightNumber: string().required(),
    // AirlineIdentifier_idAirlineIdentifier: number().required(),
    AircraftCategory_idAircraftCategory: number().required(),
    // PilotType_idPilotType: number().required(),
  });

  const resolver = useYupResolver(validationSchema);
  const {
    // register,
    control,
    handleSubmit,
    // formState: { errors }
  } = useForm({
    resolver,
    defaultValues,
    shouldUnregister: false,
  });
  console.log(aircraftCategory);
  const Buttons = () => {
    return (
      <>
        <Button onClick={handleClose} >
          Cancel
        </Button>
        <Button type="submit">
          Save changes
        </Button>
      </>
    );
  };

  const Content = () => {
    return (
      <>
        <Paper>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <AutoComplete
              control={control}
              label='Airline'
              name='AirlineIdentifier_idAirlineIdentifier'
              data={airlineIdentifier.data}
              isLoading={airlineIdentifier.isLoading}
              getOptionLabel={(option) => `${option.name}`}
            />
            <Datepicker
              control={control}
              label='Date'
              name="date"
              defaultValue={format(new Date(), 'MM/dd/yyyy')}
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
              step=".01"
              name="dayLanding"
              label="Day Landing"
            />
            <Input
              control={control}
              type="number"
              step=".01"
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

            <Switcher
              control={control}
              label="Hold"
              name="hold"
            />
            <Input
              control={control}
              type="number"
              step=".01"
              name="simulator"
              label="Simulator"
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
            <Input
              control={control}
              type="text"
              name="flightNumber"
              label="Flight Number"
            />
            <AutoComplete
              control={control}
              label='Pilot Type'
              name='PilotType_idPilotType'
              data={pilotType.data}
              isLoading={pilotType.isLoading}
              getOptionLabel={(option) => `${option.shortName}`}
            />
            <AutoComplete
              control={control}
              label='Aircraft'
              name='AircraftCategory_idAircraftCategory'
              data={aircraftCategory.data}
              isLoading={aircraftCategory.isLoading}
              getOptionLabel={(option) => `${option.shortName}`}
            />
          </form>
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
        title={'Add Flight'}
        Buttons={Buttons}
      />
    </>
  );
};

export default AddModal;

AddModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleOpen: PropTypes.func,
};
