import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, IconButton, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { handleAddNewCategory, fetchCategories, handleDeleteCategory } from "../../Services/FieldOption/index";

const BillingStatusDropdown: React.FC = () => {
  const [editedJob, setEditedJob] = useState<{ billingStatus: string }>({ billingStatus: "" });
  const [billingStatuses, setBillingStatuses] = useState<string[]>([]); // Store billing statuses
  const [newStatus, setNewStatus] = useState<string>(""); // New status input field
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch billing statuses from the backend on component mount
  useEffect(() => {
    fetchCategories(setBillingStatuses, setLoading, setError, 'billingstatus');
  }, []);

  // Handle adding a new billing status
  const handleAddBillingStatus = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newStatus.trim() !== "") {
      handleAddNewCategory(
        e,
        newStatus,
        billingStatuses,
        setBillingStatuses,
        (value: string) => setEditedJob({ billingStatus: value }),
        setNewStatus,
        setLoading,
        setError,
        "billingstatus" // Pass the fieldName as "billingStatus"
      );
      setNewStatus(""); // Clear input field after adding
    }
  };

  // Handle deleting a billing status
  const handleDeleteBillingStatus = (status: string) => {
    handleDeleteCategory(
      status,
      setBillingStatuses,
      setLoading,
      setError,
      "billingstatus" // Pass field name dynamically
    );
  };

  return (
    <div>
      {/* Dropdown for billing statuses */}
      <FormControl fullWidth size="small">
        <TextField label={'Billing Status'}
          select
          value={editedJob.billingStatus || ""}
          onChange={(e) => setEditedJob({ ...editedJob, billingStatus: e.target.value })}
          fullWidth
        >
          {billingStatuses.length === 0 ? (
            <MenuItem>
              <span>No options</span>
            </MenuItem>
          ) : (
            billingStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                <span>{status}</span>
                <IconButton
                  onClick={() => handleDeleteBillingStatus(status)}
                  style={{ marginLeft: '10px' }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </MenuItem>
            ))
          )}

          {/* Input field to add new billing status, inside the dropdown */}
          <MenuItem disableRipple>
            <TextField
              size="small"
              placeholder="New category"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)} // Typing in the new status will not reset selected value
              onKeyDown={handleAddBillingStatus}
              autoFocus
              onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing on click
            />
          </MenuItem>
        </TextField>
      </FormControl>
    </div>
  );
};

export default BillingStatusDropdown;
