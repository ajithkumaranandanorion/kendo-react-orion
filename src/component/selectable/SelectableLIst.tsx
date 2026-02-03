import  { useState } from 'react';
import { Grid, GridColumn, type GridEditChangeEvent, type GridSelectableSettings } from '@progress/kendo-react-grid';
import stylesimpleKendo from "../../modules/simplekendo.module.css"
import "@progress/kendo-theme-default/dist/all.css"
import { customTitleCell } from './internal/customCell';
import { type EditDescriptor, type TableSelectableMode } from '@progress/kendo-react-data-tools';
import { Checkbox, RadioGroup, type CheckboxChangeEvent, type RadioGroupChangeEvent } from '@progress/kendo-react-inputs';
import { employees } from './internal/employees';

export default function SelectableList() {
    const [selectionMode, setSelectionMode] = useState<TableSelectableMode | undefined>('multiple');
    const [dragEnabled, setDragEnabled] = useState<boolean>(true);
    const [cellEnabled, setCellEnabled] = useState<boolean>(true);
    const [edit, setEdit] = useState<EditDescriptor>({});

    const DATA_ITEM_KEY = 'id';

    const selectionModes = [
        {
            value: 'single',
            label: 'Single selection mode'
        },
        {
            value: 'multiple',
            label: 'Multiple selection mode'
        }
    ];

    const selectable: GridSelectableSettings = {
        enabled: true,
        drag: dragEnabled,
        cell: cellEnabled,
        mode: selectionMode
    };

    return (
        <div className={`${stylesimpleKendo.gridWrapper}]`}>
            <div>
                <Checkbox id="drag" value={dragEnabled} label={'Enable drag selection'} onChange={(e: CheckboxChangeEvent) => {
                    setDragEnabled(e.value);
                }} />
                <Checkbox id="cell" value={cellEnabled} label={'Enable cell selection'} onChange={(e: CheckboxChangeEvent) => {
                    setCellEnabled(e.value)
                }} />
            </div>
            <div>
                <RadioGroup value={selectionMode} onChange={(e: RadioGroupChangeEvent) => {
                    setSelectionMode(e.value);
                }} data={selectionModes} />
            </div>
            {employees.length > 0 && (
                <Grid
                    style={{ height: '400px' }}
                    dataItemKey={DATA_ITEM_KEY}
                    scrollable={'scrollable'}
                    autoProcessData={true}
                    data={employees}
                    fixedScroll={true}
                    selectable={selectable}
                    navigatable={true}
                    edit={edit}
                    editable={true}
                    onEditChange={(e: GridEditChangeEvent) => {
                        setEdit(e.edit)
                    }}
                >
                  <GridColumn title='Full Name' field='full_name' width={160}  cells={{data: customTitleCell}}/>
                    <GridColumn title='Job title' field='job_title' width={160}  cells={{data: customTitleCell}}/>
                    <GridColumn title='Country' field='country' width={160}  cells={{data: customTitleCell}}/>
                    <GridColumn title='Address' field='address' width={160}  cells={{data: customTitleCell}}/>
                    <GridColumn title='Phone' field='phone' width={160}  cells={{data: customTitleCell}}/>
                </Grid>
            )}
        </div>
    );
}