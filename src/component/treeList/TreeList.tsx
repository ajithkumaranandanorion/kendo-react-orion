import { extendDataItem, filterBy, mapTree, orderBy, TreeList, TreeListBooleanEditor, TreeListDateEditor, TreeListNumericEditor, TreeListTextEditor, TreeListTextFilter, type TreeListColumnProps, type TreeListDataStateChangeEvent, type TreeListExpandChangeEvent, type TreeListFilterChangeEvent, type TreeListItemChangeEvent, type TreeListRowClickEvent } from '@progress/kendo-react-treelist';
import { employeesTreeList } from './internal/employeeTreeData';
import { useEffect, useState } from 'react';
import type { AppState, DataState, Employee } from './internal/interface';
const subItemsField: string = 'employees';
const expandField: string = 'expanded';
const editField: string = 'inEdit';

// const filterOperators = {
//   text: [{ text: 'grid.filterContainsOperator', operator: 'contains' }, { text: 'grid.filterNotContainsOperator', operator: 'doesnotcontain' }, { text: 'grid.filterEqOperator', operator: 'eq' },
//   { text: 'grid.filterNotEqOperator', operator: 'neq' },
//   { text: 'grid.filterStartsWithOperator', operator: 'startswith' },
//   { text: 'grid.filterEndsWithOperator', operator: 'endswith' },
//   { text: 'grid.filterIsNullOperator', operator: 'isnull' }],
//   numeric: [{ text: 'grid.filterEqOperator', operator: 'eq' }, { text: 'grid.filterNotEqOperator', operator: 'neq' },
//   { text: 'grid.filterGteOperator', operator: 'gte' },
//   { text: 'grid.filterGtOperator', operator: 'gt' },
//   { text: 'grid.filterLteOperator', operator: 'lte' },
//   { text: 'grid.filterLtOperator', operator: 'lt' }],
//   date: [{ text: 'grid.filterEqOperator', operator: 'eq' }],
//   boolean: [{ text: 'grid.filterEqOperator', operator: 'eq' }]
// };
// const MyDropDownFilter = (props: any) => <DropDownFilter {...props} data={dropDownData} defaultItem="Select Position" />;

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

  useEffect(() => {
    console.log("state", state);
  }, [state])

  //editCell  TreeListBooleanFilter, TreeListNumericFilter,TreeListDateFilter 
  const columns: TreeListColumnProps[] = [
    { field: 'name', title: 'Name', width: '280px', expandable: true, editCell: TreeListTextEditor, filterCell: TreeListTextFilter },
    { field: 'position', title: 'Position', width: '260px', editCell: TreeListTextEditor },
    { field: 'hireDate', title: 'Hire Date', format: '{0:d}', width: '170px', editCell: TreeListDateEditor },
    { field: 'timeInPosition', title: 'Year(s) in Position', width: '170px', editCell: TreeListNumericEditor },
    { field: 'fullTime', title: 'Full Time', width: '160px', editCell: TreeListBooleanEditor }
  ];

  //Data field 
  const processData = () => {
    let { data, dataState, expanded } = state;
    let filteredData: Employee[] = filterBy(data, dataState.filter, subItemsField);
    let sortedData: Employee[] = orderBy(filteredData, dataState.sort, subItemsField);

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
    setState({
      ...state,
      editId: state.editId === e.dataItem.id ? null : e.dataItem.id
    });
  };

  //Filter 
  const handleFilterChange = (e: TreeListFilterChangeEvent) => {
    // console.log("e",e.filter)
    setState({ ...state, dataState: { ...state.dataState, filter: e.filter } });
  };

  return (
    <div> <TreeList
      style={{ maxHeight: '510px', overflow: 'auto' }}
      expandField={expandField}
      subItemsField={subItemsField}
      onExpandChange={onExpandChange}
      sortable={{ mode: 'multiple' }}
      // sortable={true}
      {...state.dataState}
      data={processData()}
      onDataStateChange={handleDataStateChange}
      onItemChange={onItemChange}
      columns={columns}
      editField={editField}
      resizable={true}
      onRowClick={rowClick}      
      filter={state.dataState.filter}
      
      onFilterChange={handleFilterChange}
    />
    </div>
  )
}

export default TreeListComponent
