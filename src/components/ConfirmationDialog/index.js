import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AlertDialog({
  title,
  description,
  disAgreeButtonText,
  agreeButtonText,
  openDialog,
  handleClose,
  handleAction,
  currentStatus,
  showClose
}) {
  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {showClose && <Button onClick={handleClose}>{"Close"}</Button>}
        <Button disabled={currentStatus === false} onClick={() => handleAction(false)}>{disAgreeButtonText}</Button>
        <Button disabled={currentStatus === true} onClick={() => handleAction(true)} autoFocus>
          {agreeButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  disAgreeButtonText: PropTypes.string.isRequired,
  agreeButtonText: PropTypes.string.isRequired,
  openDialog: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
  currentStatus: PropTypes.func.isRequired,
  showClose: PropTypes.bool
};

export default AlertDialog;
