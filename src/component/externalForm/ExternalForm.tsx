import { Grid, GridColumn, type GridCustomCellProps } from "@progress/kendo-react-grid"
import { sampleExternalFormData } from "./internal/sampleExternalFormData"
import type { EditDescriptor } from "@progress/kendo-react-data-tools";
import { useState } from "react";
import EditForm from "./internal/editForm";
import { Button } from "@progress/kendo-react-buttons";
import type { Product } from "../editing/Editing";

function ExternalForm() {
  const [edit, setEdit] = useState<EditDescriptor>({});
  const [data, setData] = useState(sampleExternalFormData);
  const editItem = sampleExternalFormData.find((item) => edit[item.ProductID]);

  interface EditCommandCellProps extends GridCustomCellProps {
    enterEdit: (item: Product) => void;
  }
  const EditCommandCell = (props: EditCommandCellProps) => {
    return (
      <td {...props.tdProps}>
        <Button themeColor={'primary'} type="button" onClick={() => props.enterEdit(props.dataItem)}>
          Edit
        </Button>
      </td>
    );
  };

  const handleSubmit = (newDataItem: any) => {
    let newItem = true;
    let newData = data.map((item) => {
      if (newDataItem.ProductID === item.ProductID) {
        newItem = false;
        item = { ...newDataItem };
      }
      return item;
    });
    if (newItem) {
      newData.push(newDataItem);
    }
    setData(newData);
    setEdit({});
  };
  const handleCancelEdit = () => {
    setEdit({});
  }
  const enterEdit = (item: Product) => {
    setEdit({ [item.ProductID]: true });
  };
  const MyEditCommandCell = (props: GridCustomCellProps) => <EditCommandCell {...props} enterEdit={enterEdit} />;
  return (
    <div>
      <Grid style={{ height: '300px' }}
        dataItemKey="ProductID"
        autoProcessData={true}
        data={data}
      >
        <GridColumn title="ID" field="ProductID" width={50} editable={false} />
        <GridColumn title="ProductName" field="ProductName" width={200} />
        <GridColumn title="Stock" field="UnitsInStock" width={80} />
        <GridColumn title="Price" field="UnitPrice" width={80} />
        <GridColumn title="QuantityPerUnit" field="QuantityPerUnit" width={200} />
        <GridColumn title="Action" cells={{ data: MyEditCommandCell }} width={100} />
      </Grid>
      {editItem ? <EditForm cancelEdit={handleCancelEdit} onSubmit={handleSubmit} item={editItem} /> : null}
    </div>
  )
}

export default ExternalForm
