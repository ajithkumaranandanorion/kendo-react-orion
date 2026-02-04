import { NumericTextBox, Slider, type NumericTextBoxChangeEvent, type SliderChangeEvent } from "@progress/kendo-react-inputs";
import type { Ref } from "react";

interface CustomPagerProps {
    handleChangePager: (event: SliderChangeEvent | NumericTextBoxChangeEvent) => void;
    totalPages: number;
    currentPage: number;
    elementRef: Ref<HTMLDivElement> | null
}

export const CustomPager = ({ handleChangePager, totalPages, currentPage, elementRef }: CustomPagerProps & {}) => {
    return (
        <div
            ref={elementRef}
            className={'k-pager k-pager-md k-grid-pager'}
            style={{ borderTop: '1px solid', borderTopColor: 'inherit' }}
        >
            <div className="col-4">
                <Slider buttons={true} step={1} value={currentPage} min={1} max={totalPages} onChange={handleChangePager} />
            </div>
            <div className="col-4">
                <NumericTextBox value={currentPage} onChange={handleChangePager} min={1} max={totalPages} />
            </div>
            <div className="col-4">{`Page ${currentPage} of ${totalPages}`}</div>
        </div>
    );
};