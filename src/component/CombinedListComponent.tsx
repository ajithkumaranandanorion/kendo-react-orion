import { lazy, Suspense } from 'react';
import { useSelectedKendo } from '../features/KendoContext';
import Loader from '../utils/SpinnerComponent';

const Pagination = lazy(() => import('./pagination/Pagination'));
const SortingComponent = lazy(() => import('./sorting/SortingComponent'));
const Editing = lazy(() => import('./editing/Editing'));
const InlineEditing = lazy(() => import('./inlineEditing/InlineEditing'));
const FormDialogEditing = lazy(() => import('./DialogEditing/DialogEditing'));
const ExternalForm = lazy(() => import('./externalForm/ExternalForm'));
const PlainList = lazy(() => import('./simplekendo/SimpleList'));
const SelectableList = lazy(() => import('./selectable/SelectableLIst'));
const DataFilterSearch = lazy(() => import('./dataFilterSearch/DataFilterSearch'));
const Exporting = lazy(() => import('./exporting/Exporting'));
const Grouping = lazy(() => import('./grouping/Grouping'));
const Aggregategrouping = lazy(() => import('./aggregategrouping/Aggregategrouping'));
const TreeListComponent = lazy(() => import('./treeList/TreeList'));
const TreeListPagination = lazy(() => import('./treeListPagination/treeListPagination'));
const TreeListEditing = lazy(() => import('./treeListEditing/TreeListEditing'));
const TreeColumn = lazy(() => import('./treeColumn/TreeColumn'));
const VirtualScrolling = lazy(() => import('./virtualScrolling/VirtualScrolling'));
const ColumnRow = lazy(() => import('./columnRow/ColumnRow'));
const TreeSelection = lazy(() => import('./treeSelection/TreeSelection'));
const TreeDragDrop = lazy(() => import('./treeDragDrop/TreeDragDrop'));
const MergeRow = lazy(() => import('./mergeRow/MergeRow'));


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
            case "exporting":
                return <Exporting />
            case "grouping":
                return <Grouping />
            case "agg grouping":
                return <Aggregategrouping />
            case "column row":
                return <ColumnRow />
            case "Two Row merge":
                return <MergeRow />

            //below is Tree list
            case "tree listing":
                return <TreeListComponent />
            case "tree pagination":
                return <TreeListPagination />
            case "tree editing":
                return <TreeListEditing />
            case "tree column":
                return <TreeColumn />
            case "tree selection":
                return <TreeSelection />
            case "tree dragdrop":
                return <TreeDragDrop />
            case "tree Virtualscroll":
                return <VirtualScrolling />
            default:
                break;
        }
    }

    return (
        <div className='m-4'>
            <Suspense fallback={<div><Loader /></div>}>
                {groupListRenderComponent()}
            </Suspense>
        </div>
    );
}

export default CombinedListComponent;
