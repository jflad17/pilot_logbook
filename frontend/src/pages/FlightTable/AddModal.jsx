import React from 'react';
import { PropTypes } from 'prop-types';
import CustomizedDialogs from '@components/Modal/Modal';
import { Paper } from '@mui/material';


/**
 * Home Page Component
 * @returns {JSX}
 */

const AddModal = ({ open, handleClose, handleOpen }) => {
  const Buttons = () => {
    return <><button>test</button></>;
  };

  const Content = () => {
    return (
      <>
        <Paper>
          <h2>Add Flight</h2>

        </Paper>
      </>
    );
  };

  return (
    <>
      <CustomizedDialogs
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
