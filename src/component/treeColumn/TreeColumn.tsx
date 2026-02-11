import { useState } from "react";
import { Employee } from "./internal/interface-treecolumn";
import employeesTreeColumn from "./internal/employeeListTreeColumn"
import { extendDataItem, mapTree, TreeList, TreeListColumnProps, TreeListColumnReorderEvent, TreeListExpandChangeEvent } from "@progress/kendo-react-treelist";

interface AppState {
    data: Employee[];
    expanded: number[];
    columns: TreeListColumnProps[];
}

const expandField: string = 'expanded';
const subItemsField: string = 'employees';

const columns: TreeListColumnProps[] = [
    { field: 'name', title: 'Name', expandable: true,  minResizableWidth: 30, locked: true, },
    { field: 'position', title: 'Position', width: '40%' },
    { field: 'hireDate', title: 'Hire Date', format: '{0:d}', width: '20%' }
];

function TreeColumn() {
    const [state, setState] = useState<AppState>({
        data: [...employeesTreeColumn],
        expanded: [1, 2, 32],
        columns
    });


    const { data, expanded } = state;
    const callback = (item: Employee) => expanded.includes(item.id) ? extendDataItem(item, subItemsField, { [expandField]: true }) : item;

    const onExpandChange = (e: TreeListExpandChangeEvent) => {
        setState({ ...state, expanded: e.value ? state.expanded.filter(id => id !== e.dataItem.id) : [...state.expanded, e.dataItem.id] })
    }

     const onColumnReorder = (event: TreeListColumnReorderEvent) => {
        setState({ ...state, columns: event.columns });
    };

    return (
        <TreeList
            style={{ maxHeight: '510px', overflow: 'auto', width: '100%' }}
            tableProps={{ style: { width: '800px' } }}
            data={mapTree(data, subItemsField, callback)}
            expandField={expandField}
            subItemsField={subItemsField}
            onExpandChange={onExpandChange}
            columns={columns}
            onColumnReorder={onColumnReorder}
            resizable={true}
            reorderable={true}
        />
    )
}

export default TreeColumn
