import * as React from 'react';
import { Button } from '@progress/kendo-react-buttons';

import {
    TreeList,
    TreeListToolbar,
    mapTree,
    extendDataItem,
    TreeListTextEditor,
    TreeListNumericEditor,
    TreeListDateEditor,
    TreeListBooleanEditor,
    type TreeListColumnProps,
    type TreeListRowClickEvent,
    type TreeListExpandChangeEvent,
    type TreeListItemChangeEvent,
    filterBy,
    orderBy,
} from '@progress/kendo-react-treelist';
import type { AppState, Employee } from './internal/interface';
import { employeesTreeList } from './internal/employeeTreeData';

const subItemsField: string = 'employees';
const expandField: string = 'expanded';
const editField: string = 'inEdit';
const columns: TreeListColumnProps[] = [
    { field: 'name', title: 'Name', width: '280px', editCell: TreeListTextEditor, expandable: true },
    { field: 'position', title: 'Position', width: '260px', editCell: TreeListTextEditor },
    { field: 'hireDate', title: 'Hire Date', format: '{0:d}', width: '170px', editCell: TreeListDateEditor },
    { field: 'timeInPosition', title: 'Year(s) in Position', width: '170px', editCell: TreeListNumericEditor },
    { field: 'fullTime', title: 'Full Time', width: '160px', editCell: TreeListBooleanEditor }
];


const TreeListComponent = () => {
 const [state, setState] = React.useState<AppState>({
    data: [...employeesTreeList],
    dataState: {
      sort: [{ field: 'name', dir: 'asc' }],
      filter: []
    },
    expanded: [1, 2, 32],
    editId: null,
    editItem: undefined,
    editItemField: undefined,
    changes: false
  });

    const rowClick = (event: TreeListRowClickEvent) => {
        setState({
            ...state,
            editId: state.editId === event.dataItem.id ? null : event.dataItem.id
        });
    };

    const onExpandChange = (event: TreeListExpandChangeEvent) => {
        setState({
            ...state,
            expanded: event.value
                ? state.expanded.filter((id) => id !== event.dataItem.id)
                : [...state.expanded, event.dataItem.id]
        });
    };

    const onItemChange = (event: TreeListItemChangeEvent) => {
        const field: any = event.field;
        setState({
            ...state,
            data: mapTree(state.data, subItemsField, (item) =>
                item.id === event.dataItem.id ? extendDataItem(item, subItemsField, { [field]: event.value }) : item
            )
        });
    };

    const closeEdit = (event:any) => {
        if (event.target === event.currentTarget) {
            setState({ ...state, editId: null });
        }
    };

    const addRecord = () => {
        const newRecord: any = { id: new Date().getTime() };

        setState({
            ...state,
            data: [newRecord, ...state.data],
            editId: newRecord.id
        });
    };

    const { data, expanded, editId } = state;
  const addExpandField = (dataTree: Employee[]) => {
    const expanded: number[] = state.expanded;
    return mapTree(dataTree, subItemsField, (item) =>
      extendDataItem(item, subItemsField, {
        [expandField]: expanded.includes(item.id)
      })
    );
  };
      const processData = () => {
    let { data, dataState, editId } = { ...state };
    // console.log("state",state);

    let filteredData: Employee[] = filterBy(data, dataState.filter, subItemsField);

    let sortedData: Employee[] = orderBy(filteredData, dataState.sort, subItemsField);
    // let updatedProcessData = [...sortedData,[editField]: item.id === editId ]
    // [editField]: item.id === editId

    return addExpandField(sortedData);
  };

    return (
        <TreeList
            style={{ maxHeight: '510px', overflow: 'auto' }}
            data={mapTree(data, subItemsField, (item) =>
                extendDataItem(item, subItemsField, {
                    [expandField]: expanded.includes(item.id),
                    [editField]: item.id === editId
                })
            )}
            editField={editField}
            expandField={expandField}
            subItemsField={subItemsField}
            onRowClick={rowClick}
            onItemChange={onItemChange}
            onExpandChange={onExpandChange}
            columns={columns}
            toolbar={
                <TreeListToolbar>
                    <div onClick={closeEdit}>
                        <Button type="button" title="Add new" themeColor={'primary'} onClick={addRecord}>
                            Add new
                        </Button>
                    </div>
                </TreeListToolbar>
            }
        />
    );
};

export default TreeListComponent
