import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Box,
  TextField,
  FormLabel,
  Button,
  IconButton,
  Typography,
  Checkbox,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState, useRef } from "react";

interface AdvanceFilterProps {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  jobDateFrom: Date | null;
  jobDateTo: Date | null;
  sellingPriceFrom: number | null;
  sellingPriceTo: number | null;
  selectedCategories: string[];
  selectedBillingStatuses: string[];
  categoryCounts: Record<string, number>;
  billingStatusCounts: Record<string, number>;
  onDateFromChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateToChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSellingPriceFromChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSellingPriceToChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBillingStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AdvanceFilter({
  open,
  onClose,
  onApply,
  jobDateFrom,
  jobDateTo,
  sellingPriceFrom,
  sellingPriceTo,
  selectedCategories,
  selectedBillingStatuses,
  categoryCounts,
  billingStatusCounts,
  onDateFromChange,
  onDateToChange,
  onSellingPriceFromChange,
  onSellingPriceToChange,
  onCategoryChange,
  onBillingStatusChange,
}: AdvanceFilterProps) {
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [billingStatusMenuOpen, setBillingStatusMenuOpen] = useState(false);
  const categoryAnchorRef = useRef<HTMLDivElement>(null);
  const billingStatusAnchorRef = useRef<HTMLDivElement>(null);

  const handleCategoryMenuToggle = () => {
    setCategoryMenuOpen((prevOpen) => !prevOpen);
  };

  const handleCategoryMenuClose = (event: Event) => {
    if (
      categoryAnchorRef.current &&
      categoryAnchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setCategoryMenuOpen(false);
  };

  const handleBillingStatusMenuToggle = () => {
    setBillingStatusMenuOpen((prevOpen) => !prevOpen);
  };

  const handleBillingStatusMenuClose = (event: Event) => {
    if (
      billingStatusAnchorRef.current &&
      billingStatusAnchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setBillingStatusMenuOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Filter Options</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} mt={1}>
          {/* Job Date Filter */}
          <Box>
            <FormLabel>Job Date</FormLabel>
            <Stack direction="row" spacing={2} mt={1}>
              <TextField
                label="From"
                type="date"
                size="small"
                value={
                  jobDateFrom ? jobDateFrom.toISOString().split("T")[0] : ""
                }
                onChange={onDateFromChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="To"
                type="date"
                size="small"
                value={jobDateTo ? jobDateTo.toISOString().split("T")[0] : ""}
                onChange={onDateToChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
          </Box>

          {/* Category Filter as MenuList */}
          <Box>
            <FormLabel>Category</FormLabel>
            <div ref={categoryAnchorRef}>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={handleCategoryMenuToggle}
                endIcon={<ArrowDropDownIcon />}
                sx={{ justifyContent: "space-between", mt: 1 }}
              >
                {selectedCategories.length > 0
                  ? `${selectedCategories.length} selected`
                  : "Select categories"}
              </Button>
              {categoryMenuOpen && (
                <Paper sx={{ width: "100%", mt: 1, zIndex: 1 }}>
                  <ClickAwayListener onClickAway={handleCategoryMenuClose}>
                    <MenuList autoFocusItem={categoryMenuOpen}>
                      {Object.keys(categoryCounts).map((category) => (
                        <MenuItem key={category}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={selectedCategories.includes(category)}
                              onChange={onCategoryChange}
                              value={category}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${category} (${categoryCounts[category]})`}
                          />
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              )}
            </div>
          </Box>

          {/* Selling Price Filter */}
          <Box>
            <FormLabel>Selling Price</FormLabel>
            <Stack direction="row" spacing={2} mt={1}>
              <TextField
                label="From"
                type="number"
                size="small"
                value={sellingPriceFrom ?? ""}
                onChange={onSellingPriceFromChange}
                fullWidth
              />
              <TextField
                label="To"
                type="number"
                size="small"
                value={sellingPriceTo ?? ""}
                onChange={onSellingPriceToChange}
                fullWidth
              />
            </Stack>
          </Box>

          {/* Billing Status Filter as MenuList */}
          <Box>
            <FormLabel>Billing Status</FormLabel>
            <div ref={billingStatusAnchorRef}>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={handleBillingStatusMenuToggle}
                endIcon={<ArrowDropDownIcon />}
                sx={{ justifyContent: "space-between", mt: 1 }}
              >
                {selectedBillingStatuses.length > 0
                  ? `${selectedBillingStatuses.length} selected`
                  : "Select billing statuses"}
              </Button>
              {billingStatusMenuOpen && (
                <Paper sx={{ width: "100%", mt: 1, zIndex: 1 }}>
                  <ClickAwayListener onClickAway={handleBillingStatusMenuClose}>
                    <MenuList autoFocusItem={billingStatusMenuOpen}>
                      {Object.keys(billingStatusCounts).map((status) => (
                        <MenuItem key={status}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={selectedBillingStatuses.includes(status)}
                              onChange={onBillingStatusChange}
                              value={status}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${status} (${billingStatusCounts[status]})`}
                          />
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              )}
            </div>
          </Box>

          {/* Action Buttons */}
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={onApply}>
              Apply Filters
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
