import { Grid, GridColumn, type GridCustomRowProps } from '@progress/kendo-react-grid'
import { productListColumn } from './internal/productListColumn'
import { Checkbox } from '@progress/kendo-react-inputs';
import { useState } from 'react';


function ColumnRow() {
    const [locked, setLocked] = useState(false)
    const [isBoldProduct, setIsBoldProduct] = useState<boolean | null>(false)
    const [isRowSpan, setIsRowSpan] = useState(false)
    const [hideStock, setHideStock] = useState(false)
    const [colSpan, setColSpan] = useState(1)
    const handleColSpan = () => {
        setColSpan(prev => prev == 1 ? 2 : 1)
    }

    const CustomRow = (props: GridCustomRowProps) => {
        const available = isBoldProduct ? props.dataItem.UnitPrice < 20 : true;
        const noBgr = { backgroundColor: '' };
        const customBgr = { backgroundColor: 'lavender', fontWeight: 'bold' };

        return (
            <tr {...props.trProps} style={Boolean(available) ? noBgr : customBgr}>
                {props.children}
            </tr>
        );
    };

    return (
        <div>
            <Checkbox label={'Enable Product name lock'} id="lockId"
                checked={locked}
                onChange={(e) => {
                    setLocked(e.value);
                }} />
                     <Checkbox label={'Differenciate price above 20'} id="isBoldProductID"
                checked={isBoldProduct}
                onChange={(e) => {
                    setIsBoldProduct(e.value);
                }} />
            <Checkbox label={'Enable row span'} id="rowspanId"
                checked={isRowSpan}
                onChange={(e) => {
                    setIsRowSpan(e.value);
                }} />
            <Checkbox label={'Show stock'} id="stockId"
                checked={hideStock}
                onChange={(e) => {
                    setHideStock(e.value);
                }} />
            <Checkbox label={'Enable product col span two'} id="colspanId"
                checked={colSpan == 1 ? false : true}
                onChange={handleColSpan} />

            <Grid style={{ height: "400px" }} data={productListColumn} resizable reorderable rowSpannable={isRowSpan} rows={{ data: CustomRow }}>
                <GridColumn title='ID' field='ProductID' width={60} maxWidth={100} minWidth={50} />
                <GridColumn title='ProductName' field='ProductName' colSpan={Number(colSpan)} />
                <GridColumn title='Stock Quantity'>
                    <GridColumn title='Stock' field='UnitsInStock' hidden={!hideStock} />
                    <GridColumn title='Quantity' field='QuantityPerUnit' locked={locked} />
                </GridColumn>
                <GridColumn title='Price' field='UnitPrice' />
                <GridColumn title='Category' field='Category.CategoryName' />
            </Grid>

        </div>
    )
}

export default ColumnRow
