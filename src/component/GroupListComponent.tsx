
import { lazy } from 'react';
import Pagination from './paging/Pagination';
import SortingComponent from './sorting/SortingComponent';
import Editing from './editing/Editing';
import { useSelectedKendo } from '../features/KendoContext';

const PlainList = lazy(() => import('./simplekendo/SimpleList'));
const SelectableList = lazy(() => import('./selectable/SelectableLIst'));
const DataFilterSearch = lazy(() => import('./dataFilterSearch/DataFilterSearch'));

function GroupListComponent() {
    const { selectedKendo } = useSelectedKendo();
    // Component switch case
    const groupListRenderComponent = () => {
        switch (selectedKendo) {
            case "simple":
                return <PlainList />
            case "selectable":
                return <SelectableList />
            case "filtering":
                return <DataFilterSearch />
            case "pagination":
                return <Pagination />
            case "sorting":
                return <SortingComponent />
            case "editing":
                return <Editing />
            default:
                break;
        }
    }
    return (
        <div className='m-4'>
            {groupListRenderComponent()}
        </div>
    );
}

export default GroupListComponent;
