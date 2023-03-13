import React from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
  title: string;
  handleButtonClick: () => void;
}
export function CustomButton({ title, handleButtonClick }: ButtonProps) {
  return (
    <Button onClick={handleButtonClick} variant="contained">
      {title}
    </Button>
  );
}
