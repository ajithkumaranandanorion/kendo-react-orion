
import { Field, type FieldRenderProps } from "@progress/kendo-react-form";
import type { GridCustomCellProps } from "@progress/kendo-react-grid";
import { Input } from "@progress/kendo-react-inputs";

export const NameCell = (props: GridCustomCellProps) => {
    return <td {...props.tdProps}>{props.dataItem[props.field || '']}</td>;
};

export const requiredValidator = (value:string) => value ? '' : 'The name is required'; 
export const TextInputWithValidation = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
        <div>
            <Input {...others} />
            {visited && validationMessage && (
                <div role="alert" className="k-form-error k-text-start">
                    {validationMessage}
                </div>
            )}
        </div>
    );
};



export const NameEditCell = (props:GridCustomCellProps) => {
    return <td {...props.tdProps}>
        <Field component={TextInputWithValidation} name={`${props.field}`} validator={requiredValidator}  />
         </td>;
};