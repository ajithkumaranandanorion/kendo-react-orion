
import { lazy, Suspense } from 'react';
import { useSelectedKendo } from '../features/KendoContext';


const Pagination = lazy(() => import('./paging/Pagination'));
const SortingComponent = lazy(() => import('./sorting/SortingComponent'));
const Editing = lazy(() => import('./editing/Editing'));
const InlineEditing = lazy(() => import('./inlineEditing/InlineEditing'));
const FormDialogEditing = lazy(() => import('./DialogEditing/DialogEditing'));
const ExternalForm = lazy(() => import('./externalForm/ExternalForm'));
const PlainList = lazy(() => import('./simplekendo/SimpleList'));
const SelectableList = lazy(() => import('./selectable/SelectableLIst'));
const DataFilterSearch = lazy(() => import('./dataFilterSearch/DataFilterSearch'));


function CombinedListComponent() {
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
            <Suspense fallback={<div>Loading...</div>}>
                {groupListRenderComponent()}
            </Suspense>
        </div>
    );
}

export default CombinedListComponent;
