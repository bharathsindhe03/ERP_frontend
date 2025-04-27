import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { handleAddNewCategory, fetchCategories, handleDeleteCategory } from "../../Services/FieldOption/index";

interface CategorySelectorProps {
  category: string;
  setCategory: (value: string) => void;
  categoryOptions: string[];
  setCategoryOptions: React.Dispatch<React.SetStateAction<string[]>>;
  field:string
}

export default function CategorySelector({
  category,
  setCategory,
  categoryOptions,
  setCategoryOptions,
}: CategorySelectorProps) {
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fieldName = "category"; // Set your dynamic field name here

  const handleDropdownToggle = async () => {
    setDropdownOpen((prev) => !prev);
    if (!dropdownOpen) {
      await fetchCategories(setCategoryOptions, setLoading, setError,'category'); // Fetch categories using the utility function
    }
  };

  const handleCategoryChange = (value: string) => {
    if (!categoryOptions.includes(value)) {
      setError("This category does not exist.");
    } else {
      setCategory(value);
    }
  };

  return (
    <>
      <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={category && categoryOptions.includes(category) ? category : ""}
          label="Category"
          onChange={(e) => handleCategoryChange(e.target.value)} // Handle category selection
          open={dropdownOpen}
          onClick={handleDropdownToggle}
          variant="outlined"
          MenuProps={{ disableAutoFocusItem: true }}
          required
        >
          <MenuItem value="">Select Category</MenuItem>

          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={20} />
            </MenuItem>
          ) : (
            categoryOptions.map((option) => (
              <MenuItem
                key={option} // Ensure key uniqueness by using category option
                value={option}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                {option}
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCategory(option, setCategoryOptions, setLoading, setError, fieldName);
                  }}
                >
                  <FaTimes size={12} />
                </IconButton>
              </MenuItem>
            ))
          )}

          {/* Add new category input */}
          <MenuItem disableRipple>
            <TextField
              size="small"
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) =>
                handleAddNewCategory(
                  e as React.KeyboardEvent<HTMLInputElement>, // Type casting
                  newCategory,
                  categoryOptions,
                  setCategoryOptions,
                  setCategory,
                  setNewCategory,
                  setLoading,
                  setError,
                  fieldName // Pass fieldName dynamically
                )
              }
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          </MenuItem>
        </Select>
      </FormControl>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
