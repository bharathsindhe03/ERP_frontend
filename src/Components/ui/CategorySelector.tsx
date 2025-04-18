import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";

interface CategorySelectorProps {
  category: string;
  setCategory: (value: string) => void;
  categoryOptions: string[];
  setCategoryOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CategorySelector({
  category,
  setCategory,
  categoryOptions,
  setCategoryOptions,
}: CategorySelectorProps) {
  const [addingNew, setAddingNew] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState("");
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleAddNewCategory = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter" && newCategory.trim()) {
      if (!categoryOptions.includes(newCategory.trim())) {
        setCategoryOptions((prev) => [...prev, newCategory.trim()]);
      }
      setCategory(newCategory.trim());
      setNewCategory("");
      setAddingNew(false);
      e.preventDefault();
    }
  };

  return (
    <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        labelId="category-label"
        id="category"
        value={category}
        label="Category"
        onChange={(e) => {
          setCategory(e.target.value);
          setDropdownOpen(false);
        }}
        required
        variant="outlined"
        open={dropdownOpen}
        onClose={() => setDropdownOpen(false)}
        onOpen={() => setDropdownOpen(true)}
        MenuProps={{ disableAutoFocusItem: true }}
      >
        <MenuItem value="" disabled>
          Select Category
        </MenuItem>
        {categoryOptions.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}

        <MenuItem disabled divider />

        {addingNew ? (
          <MenuItem disableRipple>
            <TextField
              size="small"
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={handleAddNewCategory}
              autoFocus
              onClick={(e) => e.stopPropagation()}
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setAddingNew(false);
                      setNewCategory("");
                    }}
                  >
                    <FaTimes size={12} />
                  </Button>
                ),
              }}
            />
          </MenuItem>
        ) : (
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setAddingNew(true);
              setDropdownOpen(true);
            }}
            sx={{ fontStyle: "italic", color: "primary.main" }}
          >
            + Add new category
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
