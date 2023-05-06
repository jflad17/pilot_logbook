import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { PropTypes } from 'prop-types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.any,
};

/**
 *
 * @return {Component} CustomizedDialog Component
 */
function Modal({ Content, handleClickOpen, open, handleClose, title, Buttons, useForm = False, onSubmit=null }) {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      <BootstrapDialog
        onClose={(_, reason) => {
          if (reason !== 'backdropClick') {
            handleClose();
          }
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        {useForm === true ? (
          <form onSubmit={onSubmit} noValidate>
            <DialogContent dividers>
              <Content />
            </DialogContent>
            <DialogActions>
              <Buttons />
            </DialogActions>
          </form>
        ) : (
          <>
            <DialogContent dividers>
              <Content />
            </DialogContent>
            <DialogActions>
              <Buttons />
            </DialogActions>
          </>
          )}
      </BootstrapDialog>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  Content: PropTypes.func,
  handleClickOpen: PropTypes.func,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  Buttons: PropTypes.any,
  useForm: PropTypes.bool,
  onSubmit: PropTypes.func,
};
