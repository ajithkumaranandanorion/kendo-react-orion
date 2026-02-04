import * as React from 'react';
import { GridColumnMenuFilter, GridColumnMenuGroup, GridColumnMenuSort, type GridColumnMenuProps, type GridCustomCellProps } from "@progress/kendo-react-grid";
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

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




export const MyCommandCell = (props: GridCustomCellProps & any) => {
    const { dataItem, edit, remove, add, update, enterEdit, discard, cancel } = props;

    const [visible, setVisible] = React.useState(false);

    const inEdit = edit[dataItem.ProductID];
    const isNewItem = dataItem.new === true;

    const onDeleteData = () => {
        remove(dataItem);
        setVisible(!visible);
    };

    const toggleDialog = () => {
        setVisible(!visible);
    };

    let commandLabel = 'Edit';
    if (inEdit) {
        commandLabel = isNewItem ? 'Add' : 'Update';
    }

    // Extract the nested ternary operation into a variable
    let secondaryCommandLabel = 'Remove';
    if (inEdit) {
        secondaryCommandLabel = isNewItem ? 'Discard' : 'Cancel';
    }

    return (
        <td className="k-command-cell">
            <Button
                themeColor={'primary'}
                onClick={() => {
                    if (inEdit) {
                        if (isNewItem) {
                            add(dataItem);
                        } else {
                            update(dataItem);
                        }
                    } else {
                        enterEdit(dataItem);
                    }
                }}
            >
                {commandLabel}
            </Button>
            <Button
                themeColor={'primary'}
                onClick={() => {
                    if (inEdit) {
                        if (isNewItem) {
                            discard(dataItem);
                        } else {
                            cancel(dataItem);
                        }
                    } else {
                        toggleDialog();
                    }
                }}
            >
                {secondaryCommandLabel}
            </Button>
            {visible && (
                <Dialog title={'Delete Data'} onClose={toggleDialog} width={350}>
                    <div>Are you sure you want to delete item with ID {dataItem.ProductID}?</div>
                    <DialogActionsBar>
                        <Button onClick={onDeleteData}>Delete</Button>
                        <Button onClick={toggleDialog}>Cancel</Button>
                    </DialogActionsBar>
                </Dialog>
            )}
        </td>
    );
};
