
import * as ReactDOM from 'react-dom';
export const LoadingPanel = () => {
    const panel = (
        <div className="k-loading-mask">
            <span className="k-loading-text">Loading</span>
            <div className="k-loading-image"></div>
            <div className="k-loading-color"></div>
        </div>
    );

    const treeListContent = document && document.querySelector('.treelist-wrapper');
    // console.log(treeListContent);
    return treeListContent ? ReactDOM.createPortal(panel, treeListContent) : panel;
};