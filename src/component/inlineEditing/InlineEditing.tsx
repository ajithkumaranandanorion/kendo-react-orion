
import { Grid, GridColumn, GridToolbar, type GridItemChangeEvent } from "@progress/kendo-react-grid";
import sampleEditProducts from "./internal/sampleEditingData";
import { MyCommandCell } from "./internal/customDataCell";
import { useState } from "react";
import { type EditDescriptor } from '@progress/kendo-react-data-tools';
import { Button } from "@progress/kendo-react-buttons";
import {  deleteItem, generateId, getItems, insertItem, updateItem } from "./internal/crudService";


export interface Product {
    ProductID: number;
    ProductName?: string;
    FirstOrderedOn?: Date;
    UnitsInStock?: number;
    Discontinued?: boolean;
    new?:boolean
}


function InlineEditing() {
    const [editData, setEditData] = useState<Array<Product>>(sampleEditProducts || []);
    const [edit, setEdit] = useState<EditDescriptor>({});

    const handleItemChange = (e: GridItemChangeEvent) => {
        const inEditID = e.dataItem.ProductID;
        const field = e.field || '';
        const newData = [...editData].map((item) => (item.ProductID === inEditID ? { ...item, [field]: e.value } : item));
        setEditData(newData);
    };

    //Edit
    const enterEdit = (dataItem: Product) => {
        setEdit(prev => ({
            ...prev,
            [dataItem.ProductID]: true
        }));
    }

    //Update
    const update = (dataItem: Product) => {
        updateItem(dataItem);
        setEdit(prev => ({
            ...prev,
            [dataItem.ProductID]: false
        }))
    }

    //Cancel
    const cancel = (dataItem: Product) => {
        const originalItem = getItems().find(p => p.ProductID === dataItem.ProductID);
        if (originalItem) {
            const newData = [...editData].map(item => item.ProductID === originalItem.ProductID ? originalItem : item);
            setEditData(newData);
            setEdit(prev => ({
                ...prev,
                [dataItem.ProductID]: false
            }));
        }
    }

    //Remove
    const remove = (dataItem: Product) => {
        deleteItem(dataItem);
        const newData = [...editData].filter(item => (item.ProductID !== dataItem.ProductID));
        setEditData(newData);
    }

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

    const add = (dataItem: Product) => {
         dataItem.new = false;
    insertItem(dataItem);
    setEdit(edit => ({
      ...edit,
      [dataItem.ProductID]: false
    }));
     }

    const commandCellProps = {
        edit: edit,
        enterEdit: enterEdit,
        remove: remove,
        add: add,
        update: update,
        cancel: cancel
    };
    return (
        <div>
            <Grid
                style={{ height: '300px' }}
                dataItemKey="ProductID"
                data={editData}
                autoProcessData={true}
                edit={edit}
                editable={{ mode: 'incell' }}
                onItemChange={handleItemChange}
            >
                <GridToolbar>
                    <Button title="Add new" themeColor={'primary'} onClick={addNew} type="button">
                        Add new
                    </Button>
                </GridToolbar>
                <GridColumn field="ProductID" title="Id" width="50px" editable={false} />
                <GridColumn field="ProductName" title="Product Name" width="200px" />
                <GridColumn field="FirstOrderedOn" title="First Ordered" editor="date" format="{0:d}" width="150px" />
                <GridColumn field="UnitsInStock" title="Units" width="120px" editor="numeric" />
                <GridColumn field="Discontinued" title="Discontinued" editor="boolean" />
                <GridColumn cells={{
                    data: props => <MyCommandCell {...props} {...commandCellProps} />
                }} width="200px" />      
                </Grid>
        </div>
    )
}

export default InlineEditing
