import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper from "@mui/material/Paper";
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
  selectedPaymentStatuses: string[]; // New prop for Payment Status
  categoryCounts: Record<string, number>;
  billingStatusCounts: Record<string, number>;
  paymentStatusCounts: Record<string, number>; // New prop for Payment Status counts
  onDateFromChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateToChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSellingPriceFromChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSellingPriceToChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBillingStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaymentStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // New handler for Payment Status
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
  selectedPaymentStatuses, // New prop
  categoryCounts,
  billingStatusCounts,
  paymentStatusCounts, // New prop
  onDateFromChange,
  onDateToChange,
  onSellingPriceFromChange,
  onSellingPriceToChange,
  onCategoryChange,
  onBillingStatusChange,
  onPaymentStatusChange, // New handler
}: AdvanceFilterProps) {
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [billingStatusMenuOpen, setBillingStatusMenuOpen] = useState(false);
  const [paymentStatusMenuOpen, setPaymentStatusMenuOpen] = useState(false); // New state for Payment Status menu
  const categoryAnchorRef = useRef<HTMLDivElement>(null);
  const billingStatusAnchorRef = useRef<HTMLDivElement>(null);
  const paymentStatusAnchorRef = useRef<HTMLDivElement>(null); // New ref for Payment Status menu

  const handleCategoryMenuToggle = () => {
    setCategoryMenuOpen((prevOpen) => !prevOpen);
  };

  const handleCategoryMenuClose = (event: Event) => {
    if (categoryAnchorRef.current && categoryAnchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setCategoryMenuOpen(false);
  };

  const handleBillingStatusMenuToggle = () => {
    setBillingStatusMenuOpen((prevOpen) => !prevOpen);
  };

  const handleBillingStatusMenuClose = (event: Event) => {
    if (billingStatusAnchorRef.current && billingStatusAnchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setBillingStatusMenuOpen(false);
  };

  const handlePaymentStatusMenuToggle = () => {
    setPaymentStatusMenuOpen((prevOpen) => !prevOpen);
  };

  const handlePaymentStatusMenuClose = (event: Event) => {
    if (paymentStatusAnchorRef.current && paymentStatusAnchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setPaymentStatusMenuOpen(false);
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
        <Typography variant="h6" component="div">
          Filter Options
        </Typography>
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
                value={jobDateFrom ? jobDateFrom.toISOString().split("T")[0] : ""}
                onChange={onDateFromChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField label="To" type="date" size="small" value={jobDateTo ? jobDateTo.toISOString().split("T")[0] : ""} onChange={onDateToChange} fullWidth InputLabelProps={{ shrink: true }} />
            </Stack>
          </Box>

          {/* Category Filter */}
          <Box>
            <FormLabel>Category</FormLabel>
            <div ref={categoryAnchorRef}>
              <Button fullWidth variant="outlined" size="small" onClick={handleCategoryMenuToggle} endIcon={<ArrowDropDownIcon />} sx={{ justifyContent: "space-between", mt: 1 }}>
                {selectedCategories.length > 0 ? `${selectedCategories.length} selected` : "Select categories"}
              </Button>
              {categoryMenuOpen && (
                <Paper sx={{ width: "100%", mt: 1, zIndex: 1 }}>
                  <ClickAwayListener onClickAway={handleCategoryMenuClose}>
                    <MenuList autoFocusItem={categoryMenuOpen}>
                      {Object.keys(categoryCounts).length > 0 ? (
                        Object.keys(categoryCounts).map((category) => (
                          <MenuItem key={category}>
                            <ListItemIcon>
                              <Checkbox edge="start" checked={selectedCategories.includes(category)} onChange={onCategoryChange} value={category} />
                            </ListItemIcon>
                            <ListItemText primary={`${category} (${categoryCounts[category]})`} />
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>
                          <ListItemText primary="No options available" />
                        </MenuItem>
                      )}
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
              <TextField label="From" type="number" size="small" value={sellingPriceFrom ?? ""} onChange={onSellingPriceFromChange} fullWidth />
              <TextField label="To" type="number" size="small" value={sellingPriceTo ?? ""} onChange={onSellingPriceToChange} fullWidth />
            </Stack>
          </Box>

          {/* Billing Status Filter */}
          <Box>
            <FormLabel>Billing Status</FormLabel>
            <div ref={billingStatusAnchorRef}>
              <Button fullWidth variant="outlined" size="small" onClick={handleBillingStatusMenuToggle} endIcon={<ArrowDropDownIcon />} sx={{ justifyContent: "space-between", mt: 1 }}>
                {selectedBillingStatuses.length > 0 ? `${selectedBillingStatuses.length} selected` : "Select billing statuses"}
              </Button>
              {billingStatusMenuOpen && (
                <Paper sx={{ width: "100%", mt: 1, zIndex: 1 }}>
                  <ClickAwayListener onClickAway={handleBillingStatusMenuClose}>
                    <MenuList autoFocusItem={billingStatusMenuOpen}>
                      {Object.keys(billingStatusCounts).length > 0 ? (
                        Object.keys(billingStatusCounts).map((status) => (
                          <MenuItem key={status}>
                            <ListItemIcon>
                              <Checkbox edge="start" checked={selectedBillingStatuses.includes(status)} onChange={onBillingStatusChange} value={status} />
                            </ListItemIcon>
                            <ListItemText primary={`${status} (${billingStatusCounts[status]})`} />
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>
                          <ListItemText primary="No options available" />
                        </MenuItem>
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              )}
            </div>
          </Box>

          {/* Payment Status Filter */}
          <Box>
            <FormLabel>Payment Status</FormLabel>
            <div ref={paymentStatusAnchorRef}>
              <Button fullWidth variant="outlined" size="small" onClick={handlePaymentStatusMenuToggle} endIcon={<ArrowDropDownIcon />} sx={{ justifyContent: "space-between", mt: 1 }}>
                {selectedPaymentStatuses.length > 0 ? `${selectedPaymentStatuses.length} selected` : "Select payment statuses"}
              </Button>
              {paymentStatusMenuOpen && (
                <Paper sx={{ width: "100%", mt: 1, zIndex: 1 }}>
                  <ClickAwayListener onClickAway={handlePaymentStatusMenuClose}>
                    <MenuList autoFocusItem={paymentStatusMenuOpen}>
                      {Object.keys(paymentStatusCounts).length > 0 ? (
                        Object.keys(paymentStatusCounts).map((status) => (
                          <MenuItem key={status}>
                            <ListItemIcon>
                              <Checkbox edge="start" checked={selectedPaymentStatuses.includes(status)} onChange={onPaymentStatusChange} value={status} />
                            </ListItemIcon>
                            <ListItemText primary={`${status} (${paymentStatusCounts[status]})`} />
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>
                          <ListItemText primary="No options available" />
                        </MenuItem>
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              )}
            </div>
          </Box>

          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Button onClick={onClose} color="error" variant="contained">
              Cancel
            </Button>
            <Button variant="contained" onClick={onApply} color="success">
              Apply Filters
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
