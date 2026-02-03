import { Grid, GridColumn } from "@progress/kendo-react-grid"
import { paginationDataList } from "./internal/pageProductlist";

function Pagination() {
  const DATA_ITEM_KEY = 'id';
  return (
    <div> <Grid
      style={{ height: '400px' }}
      dataItemKey={DATA_ITEM_KEY}
      scrollable={'scrollable'}
      autoProcessData={true}
      data={paginationDataList}
      fixedScroll={true}
      selectable={false}
      defaultSkip={0}
      defaultTake={10}
      pageable={{
        buttonCount: 4,
        pageSizes: [5, 10, 15, 'All']
      }}
    >
      <GridColumn title='Product ID' field='ProductID' width={160} />
      <GridColumn title='Product Name' field='ProductName' width={160} />
      <GridColumn title='Quantity Per Unit' field='QuantityPerUnit' width={160} />
      <GridColumn title='Unit Price' field='UnitPrice' width={160} />
      <GridColumn title='Units Stock ' field='UnitsInStock' width={160} />
    </Grid>n   
    </div>
  )
}

export default Pagination
