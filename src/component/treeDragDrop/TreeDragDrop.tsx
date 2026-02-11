import { extendDataItem, mapTree, moveTreeItem, TreeList, TreeListColumnProps, TreeListDraggableRow, TreeListExpandChangeEvent, TreeListRowDragEvent } from '@progress/kendo-react-treelist';
import type { Employee } from "./internal/interface-treecolumn";
import employeesTreeColumn from './internal/employeeListTreeColumn';
import { useState } from 'react';

interface AppState {
    data: Employee[];
    expanded: number[];
}

const subItemsField: string = 'employees';
const expandField: string = 'expanded';

const columns: TreeListColumnProps[] = [
    { field: "name", title: "Name", expandable: true },
    { field: "position", title: "Position", expandable: true }
]

function TreeDragDrop() {
    const [state, setState] = useState<AppState>({
        data: [...employeesTreeColumn],
        expanded: [1, 3]
    });
        const addExpandField = (dataArr: Employee[]) => {
        const expanded = state.expanded;
        return mapTree(dataArr, subItemsField, (item: Employee) =>
            extendDataItem(item, subItemsField, { expanded: expanded.includes(item.id) })
        );
    };

        const onExpandChange = (event: TreeListExpandChangeEvent) => {
        setState({
            ...state,
            expanded: event.value
                ? state.expanded.filter((id) => id !== event.dataItem.id)
                : [...state.expanded, event.dataItem.id]
        });
    };

     const onRowDrop = (event: TreeListRowDragEvent) => {
        // console.log("event", event);
        setState({
            ...state,
            data: moveTreeItem(state.data, event.dragged, event.draggedOver, subItemsField)
        });
    };

  return (
    <TreeList
            style={{ maxHeight: '540px', overflow: 'auto', width: '100%' }}
            expandField={expandField}
            data={addExpandField(state.data)}
            onExpandChange={onExpandChange}
            subItemsField={subItemsField}
            columns={columns}
            onRowDrop={onRowDrop}
            row={TreeListDraggableRow}
        />
  )
}

export default TreeDragDrop
