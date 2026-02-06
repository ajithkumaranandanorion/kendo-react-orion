import { extendDataItem, filterBy, mapTree, orderBy, TreeList, TreeListBooleanEditor, TreeListDateEditor, TreeListNumericEditor, TreeListTextEditor, type TreeListColumnProps, type TreeListDataStateChangeEvent, type TreeListExpandChangeEvent, type TreeListItemChangeEvent, type TreeListRowClickEvent } from '@progress/kendo-react-treelist';
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
      sort: [],
      filter: []
    },
    expanded: [1, 2, 32],
    editId: null,
  });

  // useEffect(()=>{
  //   console.log("state",state);    
  // },[state])

  //editCell  TreeListBooleanFilter, TreeListNumericFilter,TreeListDateFilter 
  const columns: TreeListColumnProps[] = [
    { field: 'name', title: 'Name', width: '280px',  expandable: true,  editCell: TreeListTextEditor},
    { field: 'position', title: 'Position', width: '260px', editCell: TreeListTextEditor },
    { field: 'hireDate', title: 'Hire Date', format: '{0:d}', width: '170px', editCell: TreeListDateEditor },
    { field: 'timeInPosition', title: 'Year(s) in Position', width: '170px', editCell: TreeListNumericEditor },
    { field: 'fullTime', title: 'Full Time', width: '160px', editCell: TreeListBooleanEditor }
  ];

  //Data field 
  const processData = () => {
    let { data, dataState } = state;
    let filteredData: Employee[] = filterBy(data, dataState.filter, subItemsField);
    let sortedData: Employee[] = orderBy(filteredData, dataState.sort, subItemsField);
    let expanded: number[] = state.expanded;

    return mapTree(sortedData, subItemsField, (item) =>
      extendDataItem(item, subItemsField, {
        [expandField]: expanded.includes(item.id),
        [editField]: item.id === state.editId,
      })
    );
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
    })
  }

  const rowClick = (e: TreeListRowClickEvent) => {
    console.log(e)
    setState({
      ...state,
      editId: state.editId === e.dataItem.id ? null : e.dataItem.id
    });
  };

  return (
    <div> <TreeList
      style={{ maxHeight: '510px', overflow: 'auto' }}
      expandField={expandField}
      subItemsField={subItemsField}
      onExpandChange={onExpandChange}
      // sortable={{ mode: 'multiple' }}
      sortable={true}
      {...state.dataState}
      data={processData()}
      onDataStateChange={handleDataStateChange}
      onItemChange={onItemChange}
      columns={columns}
      editField={editField}
      resizable={true}
      onRowClick={rowClick}
    /></div>
  )
}

export default TreeListComponent
