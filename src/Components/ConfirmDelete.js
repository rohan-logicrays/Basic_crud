import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmDelete(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClickOpen} className="icon-btn">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do You Really Want To Delete This User ?"}
        </DialogTitle>
        <DialogActions>
          <button onClick={handleClose}>Disagree</button>
          <button
            onClick={() => {
              handleClose();
              props.handleRemove(props.valName);
            }}
            autoFocus
          >
            Agree
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
