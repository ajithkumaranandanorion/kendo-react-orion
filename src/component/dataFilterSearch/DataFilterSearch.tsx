import * as React from 'react';
import {
    Grid,
    GridColumn as Column, type GridDataStateChangeEvent,
    type GridFilterOperators
} from '@progress/kendo-react-grid';
import { process, type State, type DataResult } from '@progress/kendo-data-query';
import { dataBindingProducts } from './internal/db-products';


const DataFilterSearch = () => {
    const [dataState, setDataState] = React.useState<State>({});
    const [dataResult, setDataResult] = React.useState<DataResult>(process(dataBindingProducts, dataState));

    const filterOperators: GridFilterOperators = {

        text: [{ text: 'grid.filterContainsOperator', operator: 'contains' }, { text: 'grid.filterNotContainsOperator', operator: 'doesnotcontain' }, { text: 'grid.filterEqOperator', operator: 'eq' },
        { text: 'grid.filterNotEqOperator', operator: 'neq' },
        { text: 'grid.filterStartsWithOperator', operator: 'startswith' },
        { text: 'grid.filterEndsWithOperator', operator: 'endswith' },
        { text: 'grid.filterIsNullOperator', operator: 'isnull' }],
        numeric: [{ text: 'grid.filterEqOperator', operator: 'eq' }, { text: 'grid.filterNotEqOperator', operator: 'neq' },
        { text: 'grid.filterGteOperator', operator: 'gte' },
        { text: 'grid.filterGtOperator', operator: 'gt' },
        { text: 'grid.filterLteOperator', operator: 'lte' },
        { text: 'grid.filterLtOperator', operator: 'lt' }],
        date: [{ text: 'grid.filterEqOperator', operator: 'eq' }],
        boolean: [{ text: 'grid.filterEqOperator', operator: 'eq' }]
    };

    return (
        <Grid
            sortable={true}
            filterable={true}
            filterOperators={filterOperators}
            groupable={true}
            style={{ height: '400px' }}
            data={dataResult}
            {...dataState}
            onDataStateChange={(e: GridDataStateChangeEvent) => {
                setDataState(e.dataState);
                setDataResult(process(dataBindingProducts, e.dataState));
            }}
        >
            <Column field="ProductID" title="ID" width="80px" filterable={false} />
            <Column field="CategoryID" title="CategoryID" width="250px" />
            <Column field="ProductName" title="Name" width="250px" />
            <Column field="UnitPrice" title="Price" filter="numeric" width="150px" />
            <Column field="UnitsInStock" title="In stock" filter="numeric" width="150px" />
        </Grid>
    );
};

export default DataFilterSearch;
