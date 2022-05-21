import React from 'react';
import { PropTypes } from 'prop-types';
import CustomizedDialogs from '@customComponents/Modal/Modal';


/**
 * Home Page Component
 * @returns {JSX}
 */

const AddModal = ({ open, handleClose, handleOpen }) => {
  const Buttons = () => {
    return <><button>test</button></>;
  };

  const Content = () => {
    return <><p>Testing para</p></>;
  };

  return (
    <>
      <CustomizedDialogs
        open={open}
        Content={Content}
        handleClickOpen={handleOpen}
        handleClose={handleClose}
        title={'test'}
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
