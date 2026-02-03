import type { SortDescriptor } from "@progress/kendo-data-query";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { paginationDataList } from "./internal/pageProductlist";
import { Checkbox } from "@progress/kendo-react-inputs";
import { useState } from "react";

function SortingComponent() {
    const [multiple, setMultiple] = useState<boolean>(false);
    const initialSort: SortDescriptor[] = [{ field: 'ProductName', dir: 'asc' }];
    return (
        <div>
            <div>
                <Checkbox
                    id="multiSort"
                    checked={multiple}
                    onChange={(e) => {
                        setMultiple(e.value);
                    }}
                    label="Enable multiple columns sorting"
                ></Checkbox>
            </div>
            <Grid
                style={{ height: '300px' }}
                dataItemKey="ProductID"
                data={paginationDataList}
                autoProcessData={true}
                sortable={{ mode: multiple ? 'multiple' : "single" }}
                // sortable={true} // single sorting
                defaultSort={initialSort}
            >
                <GridColumn field="ProductID" />
                <GridColumn field="ProductName" title="Product Name" />
                <GridColumn field="UnitPrice" title="Unit Price" />
            </Grid>
        </div>
    )
}

export default SortingComponent
