// import { LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { extendDataItem, filterBy, mapTree, orderBy, TreeList, TreeListBooleanFilter, TreeListColumnProps, TreeListDateFilter, TreeListExpandChangeEvent, TreeListFilterChangeEvent, TreeListNumericFilter, TreeListTextFilter } from '@progress/kendo-react-treelist';
import { DataState, Employee } from './internal/interface';
import { useState } from 'react';
import { employeesTreeList } from './internal/employeeTreeData';

interface AppState {
    data: Employee[];
    dataState: DataState;
    expanded: number[];
}

const columns: TreeListColumnProps[] = [
    {
        field: 'name',
        title: 'Name',
        width: '250px',
        filter: TreeListTextFilter,
        expandable: true
    },
    {
        field: 'hireDate',
        title: 'Hire Date',
        width: '200px',
        format: '{0:d}',
        filter: TreeListDateFilter
    },
    {
        field: 'timeInPosition',
        title: 'Year(s) in Position',
        width: '200px',
        filter: TreeListNumericFilter
    },
    {
        field: 'fullTime',
        title: 'Full Time',
        width: '100px',
        filter: TreeListBooleanFilter
    }
];

const subItemsField: string = 'employees';
const expandField: string = 'expanded';

const newArray = Array.from({ length: 50000 }, (_, i) => ({
    id: i + 1,
    name: `Daryl Sweeney ${i + 1}`,
    reportsTo: null,
    phone: '(555) 924-9726',
    extension: 8253,
    hireDate: new Date(2012, 2, 7),
    fullTime: true,
    position: 'CEO',
    timeInPosition: 2,
}))

const arrayEmployeeTree = [...employeesTreeList, ...newArray];

function VirtualScrolling() {

    const [state, setState] = useState<AppState>({
        data: [...arrayEmployeeTree],
        dataState: {
            sort: [{ field: 'name', dir: 'asc' }],
            filter: []
        },
        expanded: [1, 2, 32]
    });

    const processData = () => {
        let { data, dataState } = state;
        let filteredData = filterBy(data, dataState.filter, subItemsField);
        let sortedData = orderBy(filteredData, dataState.sort, subItemsField);

        return mapTree(sortedData, subItemsField, (item) =>
            extendDataItem(item, subItemsField, {
                [expandField]: state.expanded.includes(item.id)
            })
        );
    };

    const onExpandChange = (e: TreeListExpandChangeEvent) => {
        setState({
            ...state,
            expanded: e.value ? state.expanded.filter(id => id !== e.dataItem.id) :
                [...state.expanded, e.dataItem.id]
        })
    }

    const handleFilterChange = (e: TreeListFilterChangeEvent) => {
        setState({
            ...state, dataState: { ...state.dataState, filter: e.filter }
        })
    }

    return (
        //  <LocalizationProvider language="en-EN">
        <TreeList style={{ maxHeight: '510px', overflow: 'auto' }}
            data={processData()}
            columns={columns}
            expandField={expandField}
            subItemsField={subItemsField}
            rowHeight={30}
            filter={state.dataState.filter}
            onFilterChange={handleFilterChange}
            scrollable="virtual"
            onExpandChange={onExpandChange} 
            />
        // </LocalizationProvider>
    )
}

export default VirtualScrolling
