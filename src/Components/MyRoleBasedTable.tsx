import { Typography } from "@mui/material";
import TableColumns from "../Interface/TableColumns";
import TableComponent from "./TableComponent";
import MyRoleBasedTableProps from "../Interface/MyRoleBasedTableProps";
import ColumnConfig from "../Interface/ColumnConfig";
import fullColumnConfig from "../Helpers/ColumnMapping";
import columnOrder from "../Helpers/ColumnOdering";
import roleBasedFields from "../Helpers/RoleBasedFields";

export default function MyRoleBasedTable({ jobs, loading, error, isCollapsed, initialBillingFilter, userRole }: MyRoleBasedTableProps) {
  const allowedFields = userRole && roleBasedFields[userRole] ? roleBasedFields[userRole] : [];

  if (allowedFields.length === 0) {
    console.error("Invalid user role:", userRole);
    return <Typography color="error">Please contact admin to assign a role.</Typography>;
  }

  const modifiedJobs = jobs.map((job) => {
    const filteredJob: Partial<Record<keyof TableColumns, unknown>> = {};
    for (const field of allowedFields) {
      if (field === "Job Controls") {
        continue; // Skip "Action", it's not part of TableColumns
      }
      if (field in job) {
        const typedField = field as keyof TableColumns;
        const value = job[typedField];
        if (value !== undefined && value !== null) {
          filteredJob[typedField] = value;
        }
      }
    }
    return filteredJob;
  });

  const dynamicColumnConfig: ColumnConfig[] = fullColumnConfig
    .filter((config: ColumnConfig) => allowedFields.includes(config.field as string))
    .sort((a: ColumnConfig, b: ColumnConfig) => columnOrder.indexOf(a.field as string) - columnOrder.indexOf(b.field as string));

  return (
    <TableComponent jobs={modifiedJobs as TableColumns[]} loading={loading} error={error} isCollapsed={isCollapsed} initialBillingFilter={initialBillingFilter} columnConfig={dynamicColumnConfig} />
  );
}
