import TableColumns from "./TableColumns";

export default interface ColumnConfig {
  field: keyof TableColumns;
  headerName: string;
  width: string;
}