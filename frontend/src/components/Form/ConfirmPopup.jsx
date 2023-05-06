import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

/**
 * ConfirmPopup Component
 * @return {JSX}
 */
function ConfirmPopup({ open, message, handleClose, onConfirm }) {
  const handleYes = () => {
    onConfirm();
    handleClose();
  };

  const handleNo = () => {
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message ? message : 'Are you sure?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo} autoFocus>No</Button>
          <Button onClick={handleYes}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ConfirmPopup;
ConfirmPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  onConfirm: PropTypes.func,
  message: PropTypes.any,
};
