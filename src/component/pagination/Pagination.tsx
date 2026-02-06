import { Grid, GridColumn, GridToolbar, type GridPageChangeEvent } from "@progress/kendo-react-grid"
import { paginationDataList } from "./internal/pageProductlist";
import { useRef, useState } from "react";
import { CustomPager } from "./internal/Pager";
import type { PagerProps } from "@progress/kendo-react-data-tools";
import { Checkbox, type NumericTextBoxChangeEvent, type SliderChangeEvent } from "@progress/kendo-react-inputs";

function Pagination() {
  // const [page, setPage] = useState<{skip: number; take: number;}>({ skip: 0, take: 10 });
  const [isPager, setIsPager] = useState(false);
  const DATA_ITEM_KEY = 'id';
  const elementRef = useRef<HTMLDivElement>(null);

  const handleCustomPager = (props: PagerProps) => {
    const currentPage = Math.floor(props.skip / props.take) + 1;
    const totalPages = Math.ceil((props.total || 0) / props.take);
    const handleChangePager = (e: NumericTextBoxChangeEvent | SliderChangeEvent) => {
      props.onPageChange?.({
        target: { element: elementRef.current, props },
        skip: ((e.value ?? 1) - 1) * props.take,
        take: props.take,
        syntheticEvent: e.syntheticEvent,
        nativeEvent: e.nativeEvent,
        targetEvent: { value: e.value }
      });
    };

    return CustomPager({ handleChangePager, currentPage, totalPages, elementRef })
  }

  const handlePageChange = (e: GridPageChangeEvent) => {
    // setPage(e.page)
    console.log("page", e.page)
  }

  return (
    <div>
      <Grid
        style={{ height: '400px' }}
        dataItemKey={DATA_ITEM_KEY}
        scrollable={'scrollable'}
        autoProcessData={true}
        data={paginationDataList}
        defaultSkip={0}
        defaultTake={10}
        pager={isPager ? handleCustomPager : null}
        pageable={{
          buttonCount: 4,
          pageSizes: [5, 10, 15]
        }}
        onPageChange={handlePageChange}
      >
        <GridToolbar>
          <Checkbox checked={isPager} onChange={() => {
            setIsPager(prev => !prev)
          }} label="Enable pager" />
        </GridToolbar>
        <GridColumn title='Product ID' field='ProductID' width={160} />
        <GridColumn title='Product Name' field='ProductName' width={160} />
        <GridColumn title='Quantity Per Unit' field='QuantityPerUnit' width={160} />
        <GridColumn title='Unit Price' field='UnitPrice' width={160} />
        <GridColumn title='Units Stock ' field='UnitsInStock' width={160} />
      </Grid>
    </div>
  )
}

export default Pagination
