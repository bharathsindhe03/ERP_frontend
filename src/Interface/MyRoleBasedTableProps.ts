import TableColumns from "./TableColumns";

export default interface MyRoleBasedTableProps {
  jobs: TableColumns[];
  loading: boolean;
  error: string | null;
  isCollapsed: boolean;
  initialBillingFilter: string | null;
  userRole: string | null;
}