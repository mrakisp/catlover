import React, { ReactNode } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

interface DialogProps {
  isOpen: boolean;
  handleDialogClose: () => void;
  children: ReactNode;
}
export function DialogModal({
  isOpen,
  handleDialogClose,
  children,
}: DialogProps) {
  return (
    <Dialog open={isOpen} onClose={handleDialogClose}>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
