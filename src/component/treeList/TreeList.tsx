import { extendDataItem, filterBy, mapTree, orderBy, TreeList, TreeListBooleanEditor, TreeListBooleanFilter, TreeListDateFilter, TreeListNumericFilter, TreeListTextFilter, type TreeListColumnProps, type TreeListDataStateChangeEvent, type TreeListExpandChangeEvent, type TreeListItemChangeEvent } from '@progress/kendo-react-treelist';
import { employeesTreeList } from './internal/employeeTreeData';
import { useState } from 'react';
import type { AppState, DataState, Employee } from './internal/interface';
const subItemsField: string = 'employees';
const expandField: string = 'expanded';
const editField: string = 'inEdit';

function TreeListComponent() {

  const [state, setState] = useState<AppState>({
    data: [...employeesTreeList],
    dataState: {
      sort: [{ field: 'name', dir: 'asc' }],
      filter: []
    },
    expanded: [1, 2, 32]
  });

  const columns: TreeListColumnProps[] = [
    { field: 'name', title: 'Name', width: '250px', filter: TreeListTextFilter, expandable: true, editCell: TreeListBooleanEditor },
    { field: 'hireDate', title: 'Hire Date', width: '200px', format: '{0:d}', filter: TreeListDateFilter },
    { field: 'timeInPosition', title: 'Year(s) in Position', width: '200px', filter: TreeListNumericFilter },
    { field: 'fullTime', title: 'Full Time', width: '100px', filter: TreeListBooleanFilter }
  ];

  const addExpandField = (dataTree: Employee[]) => {
    const expanded: number[] = state.expanded;
    return mapTree(dataTree, subItemsField, (item) =>
      extendDataItem(item, subItemsField, {
        [expandField]: expanded.includes(item.id)
      })
    );
  };

  //Data field 
  const processData = () => {
    let { data, dataState } = state;
    let filteredData: Employee[] = filterBy(data, dataState.filter, subItemsField);
    let sortedData: Employee[] = orderBy(filteredData, dataState.sort, subItemsField);
    return addExpandField(sortedData);
  };

  const onExpandChange = (e: TreeListExpandChangeEvent) => {
    setState({
      ...state,
      expanded: e.value ? state.expanded.filter((id) => id !== e.dataItem.id) : [...state.expanded, e.dataItem.id]
    });
  };



  const handleDataStateChange = (e: TreeListDataStateChangeEvent) => {
    const next: DataState = {
      ...e.dataState,
      sort: e.dataState.sort ?? [],
      filter: e.dataState.filter ?? [],
    };

    setState(prev => ({
      ...prev,
      dataState: next,
    }));
  }

  //On edit
  const onItemChange = (e: TreeListItemChangeEvent) => {
    const field: any = e.field;
    setState(prev => {
      return {
        ...prev, data: mapTree(prev.data, subItemsField,
          (item) => item.id === e.dataItem.id ? extendDataItem(item, subItemsField, { [field]: e.value })
            : item
        )
      }
    }
    )
  }

  return (
    <div> <TreeList
      style={{ maxHeight: '510px', overflow: 'auto' }}
      expandField={expandField}
      subItemsField={subItemsField}
      onExpandChange={onExpandChange}
      sortable={{ mode: 'multiple' }}
      {...state.dataState}
      data={processData()}
      onDataStateChange={handleDataStateChange}
      onItemChange={onItemChange}
      columns={columns}
           editField={editField}
    /></div>
  )
}

export default TreeListComponent
