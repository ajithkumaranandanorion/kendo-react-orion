import type { GridCustomCellProps } from "@progress/kendo-react-grid";

export const customTitleCell = (props: GridCustomCellProps) => {
    const { dataItem, field } = props;
    const value = dataItem[field as string];
    return <td {...props.tdProps}>         
        <span>{value}</span>
    </td>
}

export const customTextFilterCell = (props: GridCustomCellProps) => {
    const { dataItem, field } = props;
    const value = dataItem[field as string];
    return <td {...props.tdProps}>
          {value.split(/(a)/i).map((part: string, index: number) =>
      /a/i.test(part) ? (
        <span key={index} style={{ color: "red" }}>
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    )}
    </td>
}