import React, { FunctionComponent } from 'react'; // we need this to make JSX compile
import { Field, IFieldProps } from "./Field";

interface ISearchField {
    searchField: IFieldProps,
    operator: IFieldProps,
    fieldValue: IFieldProps
    //sayHi: () => string
} 

export const SearchComboFields: FunctionComponent<ISearchField> = ({ searchField, operator, fieldValue }) =>
    <div>
        <Field id={searchField.id} label={searchField.label} editor={searchField.editor}
            options={searchField.options} onChange={searchField.onChange} />

        <Field id={operator.id} label={operator.label} editor={operator.editor}
            options={operator.options} onChange={operator.onChange} />

        <Field id={fieldValue.id} label={fieldValue.label} editor={fieldValue.editor}
            options={fieldValue.options} onChange={fieldValue.onChange} />				
    </div>;