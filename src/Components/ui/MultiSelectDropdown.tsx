import { FormControl, InputLabel, OutlinedInput, Select, MenuItem, Checkbox, ListItemText, SelectChangeEvent } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface MultiSelectDropdownProps {
  options: string[];
  selectedValues: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
}

export default function MultiSelectDropdown({ options, selectedValues, onChange }: MultiSelectDropdownProps) {
  return (
    <FormControl fullWidth size="small" sx={{ mt: 1 }}>
      <InputLabel>Select</InputLabel>
      <Select multiple value={selectedValues} onChange={onChange} input={<OutlinedInput label="Select" />} renderValue={(selected) => selected.join(", ")} MenuProps={MenuProps}>
        {options.length === 0 ? (
          <MenuItem disabled>No options</MenuItem>
        ) : (
          options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedValues.includes(option)} />
              <ListItemText primary={option} />
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}
