import { useState } from "react";
import {
  TextField,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

interface SearchbarProps {
  onSearch: (query: string) => void;
}

export default function Searchbar({ onSearch }: SearchbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterClick = () => {
    setFilterDialogOpen(true);
  };

  const handleFilterDialogClose = () => {
    setFilterDialogOpen(false);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    console.log(`Selected filter: ${filter}`);

    setFilterDialogOpen(false);
  };

  const availableFilters = ["Category", "Status", "Date Range"];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <TextField
        fullWidth
        label="Search jobs..."
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
          "& .MuiInputLabel-root": {
            fontSize: "1rem",
          },
        }}
      />
      <IconButton onClick={handleFilterClick} sx={{ ml: 1, scale: 1.5 }}>
        <FilterAltIcon />
      </IconButton>

      <Dialog open={filterDialogOpen} onClose={handleFilterDialogClose}>
        <DialogTitle>Filter Options</DialogTitle>
        <DialogContent>
          <List>
            {availableFilters.map((filter) => (
              <ListItem key={filter} disablePadding>
                <ListItemButton onClick={() => handleFilterSelect(filter)}>
                  <ListItemText primary={filter} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
