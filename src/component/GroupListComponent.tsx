
import { lazy } from 'react';
import Pagination from './paging/Pagination';
import SortingComponent from './sorting/SortingComponent';
import Editing from './editing/Editing';
import { useSelectedKendo } from '../features/KendoContext';
import InlineEditing from './inlineEditing/InlineEditing';
import FormDialogEditing from './DialogEditing/DialogEditing';
import ExternalForm from './externalForm/ExternalForm';

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
            case "inline editing":
                return <InlineEditing />
            case "dialog Editing":
                return <FormDialogEditing />
            case "external form":
                return <ExternalForm />
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
