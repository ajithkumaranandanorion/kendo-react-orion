
import { Grid, GridColumn } from "@progress/kendo-react-grid"
import { sampleProductsExporting } from "./internal/sampleExporting"
import { Button } from "@progress/kendo-react-buttons"
import { useRef, useState } from "react";
import { CSVLink } from 'react-csv';
// import { CSVDownload } from 'react-csv';
// import { saveGridPDF } from '@progress/kendo-react-pdf';
import { PDFExport } from '@progress/kendo-react-pdf';
import "./internal/exportingStyle.css";

// interface Page {
//     skip: number;
//     take: number;
// }
function Exporting() {

    const pdfExportRef = useRef<PDFExport | null>(null);

    const handleExportPDF = () => { 
         setPrintLayout();
        setTimeout(() => {
            pdfExportRef.current?.save()
            setNormalLayout();
        });     
    };


    const [gridData] = useState(sampleProductsExporting);
    const [scrollable, setScrollable] = useState<'scrollable' | 'none'>('scrollable');
    const [dimensions, setDimesions] = useState<any>({
        height: '500px',
        width: '600px'
    });

    // const [page, setPage] = useState<Page>({ skip: 0, take: 10 });

    function setPrintLayout() {
        setDimesions({ height: '100%', width: 'content-width', outerWidth:"96%"  });
        setScrollable('none');
    };

    function setNormalLayout() {
        setDimesions({
            height: '500px',
            width: '600px'
        });
        setScrollable('scrollable');
    };


    const print = () => {
        setPrintLayout();
        setTimeout(() => {
            window.print();
            setNormalLayout();
        });
    };



    return (
        <div>
            <div className="mb-4" >
                <Button onClick={print} themeColor={'primary'} className="k-button k-button-md k-button-solid k-button-solid-primary k-rounded-md mx-2">Print Grid</Button>

                <CSVLink
                    data={gridData}
                    className="k-button k-button-md k-button-solid k-button-solid-primary k-rounded-md mx-2"
                >
                    Export to CSV
                </CSVLink>

                <Button themeColor={'primary'} onClick={handleExportPDF} className="k-button k-button-md k-button-solid k-button-solid-primary k-rounded-md mx-2">Export to PDF</Button>
                {/* <CSVDownload data={gridData} target="_blank" /> */}
            </div>
            <div  >

        
            <PDFExport ref={pdfExportRef}  paperSize="A4" margin={"0.5cm"} fileName="orion-kendo"  scale={0.9}
            
>
                <Grid id="kendoGridPrint" style={dimensions} data={gridData} scrollable={scrollable} rowHeight={50}>
                    <GridColumn title="ProductName" field="ProductName" />
                    <GridColumn title="Stock" field="UnitsInStock" />
                    <GridColumn title="Price" field="UnitPrice" />
                    <GridColumn title="QuantityPerUnit" field="QuantityPerUnit" />
                </Grid>
            </PDFExport >
                </div>
        </div>
    )
}

export default Exporting
