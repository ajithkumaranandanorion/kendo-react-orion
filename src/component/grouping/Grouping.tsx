
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { productsList } from './internal/productsList';
import type { GroupDescriptor } from '@progress/kendo-data-query';

const initialGroup: GroupDescriptor[] = [
  {
    field: 'ProductName'
  }
];

const Grouping = () => {
    return (
    <Grid
      style={{
        height: '520px'
      }}
      dataItemKey="ProductID"
      data={productsList}
      autoProcessData={true}
      groupable={true}
      defaultGroup={initialGroup}
    >
      <Column field="ProductID" filterable={false} title="ID" width={50} locked/>
      <Column field="ProductName" title="Product Name"width={200} locked/>
      <Column field="UnitPrice" title="Price" filter="numeric" width={100} />
      <Column field="UnitsInStock" title="Units In Stock" filter="numeric" width={100} />
      <Column field="Category.CategoryName" title="Category Name" width={200}/>
      <Column field="QuantityPerUnit" title="Quantity" width={200}/>
    </Grid>
  );
};
export default Grouping;
