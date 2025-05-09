import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import InputAdornment from "@mui/material/InputAdornment";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { fetchCategories } from "../../Services/FieldOption/getFields";
import { handleAddNewCategory } from "../../Services/FieldOption/addField";
import { handleDeleteCategory } from "../../Services/FieldOption/deleteField";

interface UniversalDropdownProps {
  label: string;
  value: string;
  setValue: (val: string) => void;
  fieldName: string;
}

export default function UniversalDropdown({ label, value, setValue, fieldName }: UniversalDropdownProps) {
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState<string>("");
  const [addingNew, setAddingNew] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    fetchCategories(setOptions, fieldName);
  }, [fieldName]);

  const handleAdd = async () => {
    if (newOption.trim() !== "") {
      await handleAddNewCategory(newOption, options, setOptions, (val: string) => setValue(val), setNewOption, fieldName);
      setNewOption("");
      setAddingNew(false);
      setAnchorEl(null);
    }
  };

  const handleDelete = (option: string) => {
    handleDeleteCategory(option, setOptions, fieldName);
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAddingNew(false);
    setNewOption("");
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <TextField fullWidth label={label} value={value} onClick={handleOpen} inputProps={{ readOnly: true }} size="small" />

      <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Box sx={{ width: 300, p: 1 }}>
          <List dense>
            {options.length === 0 ? (
              <ListItem>
                <ListItemText primary="No options available" />
              </ListItem>
            ) : (
              options.map((option) => (
                <ListItem key={option} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      console.log("Selected value:", option);
                      setValue(option);
                      handleClose();
                    }}
                  >
                    <ListItemText primary={option} />
                    <IconButton
                      edge="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(option);
                      }}
                      size="small"
                    >
                      <CloseIcon fontSize="small" color="error" />
                    </IconButton>
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>

          {addingNew ? (
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <TextField
                size="small"
                placeholder={`New ${label.toLowerCase()}`}
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAdd();
                  }
                }}
                fullWidth
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={handleAdd}>
                        <CheckIcon color="primary" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          ) : (
            <MenuItem
              onClick={() => {
                setAddingNew(true);
              }}
            >
              <AddIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">Add New {label}</Typography>
            </MenuItem>
          )}
        </Box>
      </Popover>
    </Box>
  );
}
