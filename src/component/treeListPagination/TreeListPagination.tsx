import * as React from 'react';
import {
  TreeList,
  mapTreeItem,
  extendDataItem,
  type TreeListExpandChangeEvent,
  type TreeListPageChangeEvent,
  type TreeListColumnProps,
  TreeListTextEditor,
  TreeListDateEditor,
  TreeListNumericEditor,
  TreeListBooleanEditor,
  type TreeListRowDragEvent,
  TreeListDraggableRow,
} from '@progress/kendo-react-treelist';
import type { Employee } from '../treeList/internal/interface';
import { moveTreeItem, Pager, type PagerProps } from '@progress/kendo-react-data-tools';
import { employeesTreeList } from '../treeList/internal/employeeTreeData';
import { LoadingPanel } from './internal/loading';

interface AppState {
  data: Employee[];
  expanded: number[];
  skip: number;
  take: number;
}

const columns: TreeListColumnProps[] = [
  { field: 'name', title: 'Name', width: '280px', expandable: true, editCell: TreeListTextEditor },
  { field: 'position', title: 'Position', width: '260px', editCell: TreeListTextEditor },
  { field: 'hireDate', title: 'Hire Date', format: '{0:d}', width: '170px', editCell: TreeListDateEditor },
  { field: 'timeInPosition', title: 'Year(s) in Position', width: '170px', editCell: TreeListNumericEditor },
  { field: 'fullTime', title: 'Full Time', width: '160px', editCell: TreeListBooleanEditor }
];

const TreeListPagination = () => {
  const subItemsField: string = 'employees';
  const expandField: string = 'expanded';
  const [loading, setLoading] = React.useState<boolean | null>(null);

  const [state, setState] = React.useState<AppState>({
    data: [...employeesTreeList],
    expanded: [],
    skip: 0,
    take: 8
  });

  const TreeListPager = (props: PagerProps) => {
    return (
      <Pager
        {...props}
        previousNext={true}
        buttonCount={8} />
    )
  }

  const onExpandChange = (event: TreeListExpandChangeEvent) => {
    const { dataItem, value, level } = event;
    const expanded = !value;
    const tree: Employee[] = [...state.data];
    setLoading(value ? false : true);
    mapTreeItem(tree, level, subItemsField, (item) =>
      extendDataItem(item, subItemsField, { [expandField]: expanded })
    );
    setLoading(false);

    setState({
      ...state,
      data: tree,
      expanded: value
        ? state.expanded.filter((id) => id !== dataItem.id)
        : [...state.expanded, dataItem.id]
    });
  };

  const onPageChange = (event: TreeListPageChangeEvent) => {
    const { skip, take } = event;
    setState({
      ...state,
      skip,
      take
    });
  };
  // const numberOfColumns = 100;

  const onRowDrop = (event: TreeListRowDragEvent) => {
    setState({
      ...state,
      data: moveTreeItem(state.data, event.dragged, event.draggedOver, subItemsField)
    });
  };

  return (<>
    <TreeList
      pager={TreeListPager}
      onPageChange={onPageChange}
      skip={state.skip}
      take={state.take}
      data={state.data}
      expandField={expandField}
      subItemsField={subItemsField}
      onExpandChange={onExpandChange}
      columns={columns}
      onRowDrop={onRowDrop}
      row={TreeListDraggableRow}
    // columnVirtualization={numberOfColumns > 15}
    //  scrollable="virtual"
    //   rowHeight={40}
    />
    {loading && <LoadingPanel />}
  </>
  );
};

export default TreeListPagination;