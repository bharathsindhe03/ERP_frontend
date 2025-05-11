import { Dialog, DialogTitle, DialogContent, Stack, Box, TextField, FormLabel, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MultiSelectDropdown from "../ui/MultiSelectDropdown"; // Adjust path as needed
import { SelectChangeEvent } from "@mui/material/Select";

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
  selectedPaymentStatuses: string[];
  categoryCounts: Record<string, number>;
  billingStatusCounts: Record<string, number>;
  paymentStatusCounts: Record<string, number>;
  onDateFromChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateToChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSellingPriceFromChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSellingPriceToChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBillingStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaymentStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  selectedPaymentStatuses,
  categoryCounts,
  billingStatusCounts,
  paymentStatusCounts,
  onDateFromChange,
  onDateToChange,
  onSellingPriceFromChange,
  onSellingPriceToChange,
  onCategoryChange,
  onBillingStatusChange,
  onPaymentStatusChange,
}: AdvanceFilterProps) {
  const wrapChangeEvent = (values: string[]) => ({ target: { value: values } } as unknown as React.ChangeEvent<HTMLInputElement>);

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

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
            <MultiSelectDropdown
              options={Object.keys(categoryCounts)}
              selectedValues={selectedCategories}
              onChange={(e: SelectChangeEvent<string[]>) => {
                const value = typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value;
                onCategoryChange(wrapChangeEvent(value));
              }}
            />
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
            <MultiSelectDropdown
              options={Object.keys(billingStatusCounts)}
              selectedValues={selectedBillingStatuses}
              onChange={(e: SelectChangeEvent<string[]>) => {
                const value = typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value;
                onBillingStatusChange(wrapChangeEvent(value));
              }}
            />
          </Box>

          {/* Payment Status Filter */}
          <Box>
            <FormLabel>Payment Status</FormLabel>
            <MultiSelectDropdown
              options={Object.keys(paymentStatusCounts)}
              selectedValues={selectedPaymentStatuses}
              onChange={(e: SelectChangeEvent<string[]>) => {
                const value = typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value;
                onPaymentStatusChange(wrapChangeEvent(value));
              }}
            />
          </Box>

          {/* Action Buttons */}
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
