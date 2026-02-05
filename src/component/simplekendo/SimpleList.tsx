
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import stylesimpleKendo from "../../module-css/simplekendo.module.css"
import "@progress/kendo-theme-default/dist/all.css"
import { employees } from './internal/employees';
export default function PlainList() {
    const DATA_ITEM_KEY = 'id';
    return (
        <div className={`${stylesimpleKendo.gridWrapper}]`}>
            {employees.length > 0 && (
                <Grid
                    style={{ height: '400px' }}
                    dataItemKey={DATA_ITEM_KEY}
                    scrollable={'scrollable'}
                    autoProcessData={true}
                    data={employees}
                    fixedScroll={true}
                    selectable={false}
                >
                    <GridColumn title='Full Name' field='full_name' width={160} />
                    <GridColumn title='Job Title' field='job_title' width={160} />
                    <GridColumn title='Country' field='country' width={160} />
                    <GridColumn title='Address' field='address' width={160} />
                    <GridColumn title='Phone ' field='phone' width={160} />
                </Grid>
            )}
        </div>
    );
}
