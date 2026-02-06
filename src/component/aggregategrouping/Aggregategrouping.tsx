
import { Grid, GridColumn as Column, type GridCustomCellProps, type GridDataStateChangeEvent } from '@progress/kendo-react-grid';
import { productsList } from './internal/productsList';
import { process, type AggregateDescriptor, type GroupDescriptor, type State } from '@progress/kendo-data-query';
import { setGroupIds } from '@progress/kendo-react-data-tools';
import type { Product } from '../editing/Editing';
import { useState } from 'react';

const initialGroup: GroupDescriptor[] = [{ field: 'ProductName' }];
const initialDataState: State = {
  take: 10,
  skip: 0,
  group: initialGroup
};
const aggregates: AggregateDescriptor[] = [
  { field: 'UnitsInStock', aggregate: 'sum' },
  { field: 'UnitPrice', aggregate: 'average' }
];
const processWithGroups = (data: Product[], dataState: State) => {
  if (dataState.group) {
    dataState.group.forEach((group) => (group.aggregates = aggregates));
  }

  const newDataState = process(data, dataState);
  setGroupIds({ data: newDataState.data, group: dataState.group });

  return newDataState;
};


const Aggregategrouping = () => {

  const [dataState, setDataState] = useState<State>(initialDataState);
  const [resultState, setResultState] = useState(processWithGroups(productsList, initialDataState));

  const MyFooterCustomCell = (props: GridCustomCellProps) => {
    let cellContent;
    if (props.field === 'UnitPrice') {
      cellContent = `Average: ${props.dataItem.aggregates.UnitPrice.average}`;
    } else if (props.field === 'UnitsInStock') {
      cellContent = `Sum: ${props.dataItem.aggregates.UnitsInStock.sum}`;
    }

    return (
      <td {...props.tdProps} colSpan={1}>
        {cellContent}
      </td>
    );
  };

  const handleDataStateChange = (event: GridDataStateChangeEvent) => {
    const newDataState = processWithGroups(productsList, event.dataState);
    setDataState(event.dataState);
    setResultState(newDataState);
  }

  return (
    <Grid
      style={{
        height: '520px'
      }}
      dataItemKey="ProductID"
      data={productsList}
      // data={resultState.data}
      autoProcessData={true}
      groupable={{ footer: 'visible', enabled: true }}
      {...dataState}
      defaultGroup={initialGroup}
      cells={{ groupFooter: MyFooterCustomCell }}
      onDataStateChange={handleDataStateChange}
      total={resultState.total}
    >
      <Column field="ProductID" filterable={false} title="ID" width={50} locked />
      <Column field="ProductName" title="Product Name" width={200} />
      <Column field="UnitPrice" title="Price" filter="numeric" width={150} />
      <Column field="UnitsInStock" title="Units In Stock" filter="numeric" width={100} />
      <Column field="Category.CategoryName" title="Category Name" width={200} />
      <Column field="QuantityPerUnit" title="Quantity" width={200} />
    </Grid>
  );
};
export default Aggregategrouping;
