import { getter } from '@progress/kendo-data-query';
import { extendDataItem, getSelectedState, getSelectedStateFromKeyDown, mapTree, TreeList, TreeListExpandChangeEvent, TreeListKeyDownEvent, TreeListSelectionChangeEvent } from '@progress/kendo-react-treelist'
import { useCallback, useState } from 'react';
import employeesTreeColumn from '../treeColumn/internal/employeeListTreeColumn';
import { Employee } from '../treeColumn/internal/interface-treecolumn';
import { Checkbox, CheckboxChangeEvent, RadioGroup, RadioGroupChangeEvent } from '@progress/kendo-react-inputs';

const DATA_ITEM_KEY: string = 'id';
const SUB_ITEMS_FIELD: string = 'employees';
const EXPAND_FIELD: string = 'expanded';
const SELECTED_FIELD: string = 'selected';
const idGetter: any = getter(DATA_ITEM_KEY);

const selectionModes: { value: 'single' | 'multiple'; label: string }[] = [
    { value: 'single', label: 'Single selection mode' },
    { value: 'multiple', label: 'Multiple selection mode' }
];

const extendData = (dataState: any, selectedState: any, expandedState: any) => {
    return mapTree(dataState, SUB_ITEMS_FIELD, (item) =>
        extendDataItem(item, SUB_ITEMS_FIELD, {
            selected: selectedState[idGetter(item)],
            expanded: expandedState[idGetter(item)]
        })
    ); ``
};


function TreeSelection() {
    const [dataState, setDataState] = useState<Employee[]>(employeesTreeColumn.slice());

    const [selectedState, setSelectedState] = useState<{ [id: string]: number[] | boolean }>({});

    const [expandedState, setExpandedState] = useState<{ [n: number]: boolean }>({ 1: true, 2: true, 32: true });


    const [dragEnabled, setDragEnabled] = useState<boolean>(true);
    const [cellEnabled, setCellEnabled] = useState<boolean>(true);
    const [selectionMode, setSelectionMode] = useState<'single' | 'multiple'>(selectionModes[1].value);

    const onSelectionChange = useCallback(
        (event: TreeListSelectionChangeEvent) => {
            const newSelectedState = getSelectedState({
                event,
                selectedState: selectedState,
                dataItemKey: DATA_ITEM_KEY
            });
            setSelectedState(newSelectedState);
        },
        [selectedState]
    );

    const onKeyDown = (event: TreeListKeyDownEvent) => {
        const newSelectedState = getSelectedStateFromKeyDown({
            event,
            selectedState: selectedState,
            dataItemKey: DATA_ITEM_KEY
        });
        setSelectedState(newSelectedState);
    };

    const onExpandChange = useCallback(
        (e: TreeListExpandChangeEvent) => {
            setExpandedState({ ...expandedState, [idGetter(e.dataItem)]: !e.value });
        },
        [expandedState]
    );

    const onDragChange = (event: CheckboxChangeEvent) => {
        setDragEnabled(event.value);
    };

    const onCellChange = (event: CheckboxChangeEvent) => {
        setCellEnabled(event.value);
    };

    const onSelectionModeChange = (event: RadioGroupChangeEvent) => {
        setSelectionMode(event.value);
    };


    return (
        <div>
            <Checkbox value={dragEnabled} label={'Enable drag selection'} onChange={onDragChange} />
            <Checkbox value={cellEnabled} label={'Enable cell selection'} onChange={onCellChange} />
            <RadioGroup value={selectionMode} onChange={onSelectionModeChange} data={selectionModes} />

            <TreeList
                style={{ maxHeight: '510px', overflow: 'auto' }}
                data={extendData(dataState, selectedState, expandedState)}
                selectedField={SELECTED_FIELD}
                expandField={EXPAND_FIELD}
                subItemsField={SUB_ITEMS_FIELD}
                dataItemKey={DATA_ITEM_KEY}
                selectable={{
                    enabled: true,
                    drag: dragEnabled,
                    cell: cellEnabled,
                    mode: selectionMode
                }}
                navigatable={true}
                onSelectionChange={onSelectionChange}
                onExpandChange={onExpandChange}
                onKeyDown={onKeyDown}
                columns={[
                    { field: 'name', title: 'Name', expandable: true, width: '31%' },
                    { field: 'position', title: 'Position', width: '31%' },
                    { field: 'hireDate', title: 'Hire Date', format: '{0:d}', width: '31%' }
                ]}
            />
        </div>
    )
}

export default TreeSelection
