import { extendDataItem, mapTree, TreeList, TreeListBooleanEditor, TreeListDateEditor, TreeListNumericEditor, TreeListTextEditor, TreeListTextFilter, TreeListToolbar, type TreeListColumnProps, type TreeListDataStateChangeEvent, type TreeListExpandChangeEvent, type TreeListItemChangeEvent, type TreeListRowClickEvent } from '@progress/kendo-react-treelist';
import { employeesTreeList } from './internal/employeeTreeData';
import { useState } from 'react';
import type { AppState, DataState, Employee } from './internal/interface';
const subItemsField: string = 'employees';
const expandField: string = 'expanded';
const editField: string = 'inEdit';
import { Button } from '@progress/kendo-react-buttons';
import { createRenderers } from './internal/cellrender';

function TreeListEditing() {
  let renderers;

  const [state, setState] = useState<AppState>({
    data: [...employeesTreeList],
    expanded: [1, 2, 32],
    editId: null,
    editItem: undefined,
    editItemField: undefined,
    changes: false
  });

  const saveChanges = () => {
    employeesTreeList.splice(0, employeesTreeList.length, ...state.data);
    setState({
      ...state,
      editItem: undefined,
      editItemField: undefined,
      changes: false
    });
  };

  // useEffect(() => {
  //   console.log("state", state);
  // }, [state])

  //editCell  TreeListBooleanFilter, TreeListNumericFilter,TreeListDateFilter 
  const columns: TreeListColumnProps[] = [
    { field: 'name', title: 'Name', width: '280px', expandable: true, editCell: TreeListTextEditor, filterCell: TreeListTextFilter },
    { field: 'position', title: 'Position', width: '260px', editCell: TreeListTextEditor },
    { field: 'hireDate', title: 'Hire Date', format: '{0:d}', width: '170px', editCell: TreeListDateEditor },
    { field: 'timeInPosition', title: 'Year(s) in Position', width: '170px', editCell: TreeListNumericEditor },
    { field: 'fullTime', title: 'Full Time', width: '160px', editCell: TreeListBooleanEditor }
  ];

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
  // const handleFilterChange = (e: TreeListFilterChangeEvent) => {
  // const updateFilter = { ...state.dataState, filter: e.filter }
  // setState({ ...state, ...updateFilter });
  // };

  const enterEdit = (dataItem: Employee, field: string) => {
    setState({
      ...state,
      editItem: { ...dataItem },
      editItemField: field
    });
  };
  const exitEdit = () => {
    setState({
      ...state,
      editItem: undefined,
      editItemField: undefined
    });
  };

  const cancelChanges = () => {
    setState({
      ...state,
      data: [...employeesTreeList],
      editItem: undefined,
      editItemField: undefined,
      changes: false
    });
  };

  const { data, changes, expanded, editItem, editItemField } = state;

  renderers = createRenderers(enterEdit, exitEdit, editField);

  return (
    <div>
      <TreeList
        style={{ maxHeight: '510px', overflow: 'auto' }}
        expandField={expandField}
        subItemsField={subItemsField}
        onExpandChange={onExpandChange}
        sortable={{ mode: 'multiple' }}
        // sortable={true}
        // {...state.dataState}
        data={mapTree(data, subItemsField, (item) =>
          extendDataItem(item, subItemsField, {
            [expandField]: expanded.includes(item.id),
            [editField]: item.id === editItem ? editItemField : undefined
          })
        )}
        onDataStateChange={handleDataStateChange}
        onItemChange={onItemChange}
        columns={columns.map((column) => ({
          ...column,
          editCell: editItemField === column.field ? column.editCell : undefined
        }))}
        editField={editField}
        resizable={true}
        onRowClick={rowClick}
        cellRender={renderers.cellRender}
        // filterOperators={filterOperators}
        // filter={state.dataState.filter}
        // onFilterChange={handleFilterChange}
        toolbar={
          <TreeListToolbar>
            <Button type="button" title="Save Changes" onClick={saveChanges} disabled={!changes}>
              Save Changes
            </Button>
            <Button type="button" title="Cancel Changes" onClick={cancelChanges} disabled={!changes}>
              Cancel Changes
            </Button>
          </TreeListToolbar>
        }
      />
    </div>
  )
}

export default TreeListEditing
