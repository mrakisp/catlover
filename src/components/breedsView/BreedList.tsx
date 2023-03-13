import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

//intefaces
import { IBreed } from "@interfaces/cats";

interface SelectBreedsProps {
  data: IBreed[];
  selectedBreed: string;
  handleChange: (breedId: string) => void;
}
export function SelectBreeds({
  data,
  selectedBreed,
  handleChange,
}: SelectBreedsProps) {
  const handleSelect = (event: SelectChangeEvent) => {
    handleChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 320 }}>
      <FormControl fullWidth>
        <InputLabel>Breeds</InputLabel>
        <Select
          value={selectedBreed}
          label="Breed"
          onChange={handleSelect}
          MenuProps={{ PaperProps: { sx: { maxHeight: 400 } } }}
        >
          {data?.map(function (breed: IBreed) {
            return (
              <MenuItem key={breed.id} value={breed.id}>
                {breed.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
