import { GridColumnMenuFilter, GridColumnMenuGroup, GridColumnMenuSort, type GridColumnMenuProps, type GridCustomCellProps } from "@progress/kendo-react-grid";

export const CustomDataCell = (props:GridCustomCellProps) => {
  const { dataItem, field } = props;
  const raw = dataItem[field as string];

  // Ensure it's a Date instance. If it's an ISO/string/number, convert it.
  const date =
    raw instanceof Date ? raw : raw ? new Date(raw) : null;

  // Format: en-IN -> dd/mm/yyyy by default
  const text = date
    ? date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  return <td>{text}</td>;
};

export const ColumnMenu = (props: GridColumnMenuProps) => {
    return (
        <div>
            <GridColumnMenuSort {...props} />
            <GridColumnMenuFilter {...props} />
            <GridColumnMenuGroup {...props} />
        </div>
    );
};