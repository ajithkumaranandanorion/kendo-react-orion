
import { Grid, GridColumn, GridToolbar, type GridEditChangeEvent, type GridItemChangeEvent } from "@progress/kendo-react-grid";
import sampleEditProducts from "./internal/sampleEditingData";
import { ColumnMenu, CustomDataCell } from "./internal/customDataCell";
import { useState } from "react";
import { type EditDescriptor } from '@progress/kendo-react-data-tools';
import { Button } from "@progress/kendo-react-buttons";
import { Checkbox } from "@progress/kendo-react-inputs";

export interface Product {
    ProductID: number;
    ProductName?: string;
    FirstOrderedOn?: Date;
    UnitsInStock?: number;
    Discontinued?: boolean;
}

// Editable all field
const allInEdit = () => {
    let result = {} as Record<Product["ProductID"], string[]>;
    const editedColumns = Object.keys(sampleEditProducts[0]);
    sampleEditProducts.forEach((product) => {
        result[product.ProductID] = editedColumns;
    });
    return result;
};


function Editing() {
    // const initialSort: SortDescriptor[] = [{ field: 'ProductName', dir: 'asc' }];
    const [editData, setEditData] = useState<Array<Product>>(sampleEditProducts || []);
    const [changes, setChanges] = useState<boolean>(false);
    const [edit, setEdit] = useState<EditDescriptor>({});
    const [multiple, setmultiple] = useState<boolean>(false);

    const saveChanges = () => {
        // @ts-expect-error
        sampleEditProducts.splice(0, sampleEditProducts.length, ...editData);
        setChanges(false);
        !multiple && setEdit({});
    };

    const cancelChanges = () => {
        setChanges(false);
        setEditData(sampleEditProducts);
        !multiple && setEdit({});
    };


    const handleItemChange = (e: GridItemChangeEvent) => {
        const inEditID = e.dataItem.ProductID;
        const field = e.field || '';
        const newData = [...editData].map((item) => (item.ProductID === inEditID ? { ...item, [field]: e.value } : item));
        setEditData(newData);
        setChanges(true);
    };

    const handleCheckboxChange = () => {
        setmultiple(prev => {
            !prev ? setEdit(allInEdit) : setEdit({});
            return !prev
        })
    }

    return (
        <div>
            <Grid
                style={{ height: '300px' }}
                dataItemKey="ProductID"
                data={editData}
                autoProcessData={true}
                sortable={true}
                edit={edit}
                defaultSkip={0}
                defaultEdit={edit}
                editable={{ mode: 'incell' }}
                onEditChange={(e: GridEditChangeEvent) => {
                    setEdit(e.edit)
                }}
                onItemChange={handleItemChange}
            // defaultSort={initialSort}
            >
                <GridToolbar>
                    <Button title="Save Changes" type="button" onClick={saveChanges} disabled={!changes}>
                        Save Changes
                    </Button>
                    <Button title="Cancel Changes" type="button" onClick={cancelChanges} disabled={!changes}>
                        Cancel Changes
                    </Button>
                    <div className="ml-4 w-40">
                        <Checkbox className="w-6 justify-start" defaultChecked={false} value={multiple} label={multiple ? 'Multiple Field Editing' : 'Single Field Editing'} onClick={handleCheckboxChange} />

                    </div>
                </GridToolbar>
                <GridColumn field="ProductID" title="ID" width={100} columnMenu={ColumnMenu} editable={false} />
                <GridColumn field="ProductName" title="Name" width={"auto"} editor="text" />
                <GridColumn field="UnitPrice" title="Unit Price" width={100} editor="numeric" />
                <GridColumn field="UnitsOnOrder" title="First Ordered On" width={100} editable={false} />
                <GridColumn field="FirstOrderedOn" title="First Ordered" width={100} cells={{ data: CustomDataCell }} editable={false} />
            </Grid>
        </div>
    )
}

export default Editing
