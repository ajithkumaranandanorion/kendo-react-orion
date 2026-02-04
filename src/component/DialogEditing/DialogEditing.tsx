
import { Grid, GridColumn, GridToolbar, type GridEditChangeEvent, type GridItemChangeEvent, type GridRowClickEvent } from "@progress/kendo-react-grid";
import { sampleEditProducts } from "./internal/sampleDialogEditData";
import { useState } from "react";
import { type EditDescriptor } from '@progress/kendo-react-data-tools';
import { Button } from "@progress/kendo-react-buttons";
import { generateId } from "./internal/crudService";
import { NameCell, NameEditCell } from "./internal/customDialogCell";


export interface Product {
    ProductID: number;
    ProductName?: string;
    FirstOrderedOn?: Date;
    UnitsInStock?: number;
    Discontinued?: boolean;
    new?: boolean
}

const DATA_ITEM_KEY = 'ProductID';

function FormDialogEditing() {
    const [editData, setEditData] = useState<Array<Product>>(sampleEditProducts || []);
    const [edit, setEdit] = useState<EditDescriptor>({});

    const handleItemChange = (e: GridItemChangeEvent) => {
        const inEditID = e.dataItem.ProductID;
        const newData = [...editData].map((item) => (item.ProductID === inEditID ? { ...item, ...e.dataItem } : item));
        setEditData(newData);
        setEdit({});
    };

    //Add field 
    const addNew = () => {
        const newDataItem = {
            ProductID: generateId(editData),
            Discontinued: false,
            new: true
        };
        setEditData([newDataItem, ...editData]);
        setEdit(edit => ({
            ...edit,
            [newDataItem.ProductID]: true
        }));
    };



    const handleEditChange = (event: GridEditChangeEvent) => {
        setEdit(event.edit);
    };
    const rowClick = (event: GridRowClickEvent) => {
        const inEditID = event.dataItem[DATA_ITEM_KEY];

        setEdit({ [inEditID]: true });
    };

    return (
        <div>
            <Grid
                style={{ height: '300px' }}
                autoProcessData={true}
                dataItemKey={DATA_ITEM_KEY}
                data={editData}
                edit={edit}
                editable={{ mode: 'dialog', enabled: true }}
                onRowClick={rowClick}
                onEditChange={handleEditChange}
                onItemChange={handleItemChange}
            >
                <GridToolbar>
                    <Button title="Add new" themeColor={'primary'} onClick={addNew} type="button">
                        Add new
                    </Button>
                </GridToolbar>

                <GridColumn field="ProductID" title="Id" width="50px" editable={false} />
                <GridColumn field="ProductName" title="Product Name" width="200px" cells={{
                    data: NameCell,
                    edit: {
                        text: NameEditCell
                    }
                }} />
                <GridColumn field="QuantityPerUnit" title="Quantity Per Unit" width="200px" cells={{
                    data: NameCell,

                }} />
            </Grid>
        </div>
    )
}

export default FormDialogEditing
