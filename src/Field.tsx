import * as React from "react";

/* The available editors for the field */
type Editor = "textbox" | "multilinetextbox" | "dropdown";

export interface IFieldProps {
    /* The unique field name */
    id: string;

    /* The label text for the field */
    label?: string;

    /* The editor for the field */
    editor?: Editor;

    /* The drop down items for the field */
    options?: string[];

    /* The field value */
    value?: any;

    onChange: any;
}

export const Field: React.FunctionComponent<IFieldProps> = ({
    id,
    label,
    editor,
    options,
    value,
    onChange
}) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={id}>{label}</label>}

            {/* https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
                    let s = e!.name; // Assert that e is non-null and then access name
                    */}

            {editor!.toLowerCase() === "textbox" && (
                <input
                    id={id}
                    type="text"
                    value={value}
                    onChange={onChange}
                    onBlur={
                        (e: React.FormEvent<HTMLInputElement>) =>
                            console.log(e) /* TODO: validate field value */
                    }
                    className="form-control"
                />
            )}

            {editor!.toLowerCase() === "multilinetextbox" && (
                <textarea
                    id={id}
                    value={value}
                    onChange={onChange}
                    onBlur={
                        (e: React.FormEvent<HTMLTextAreaElement>) =>
                            console.log(e) /* TODO: validate field value */
                    }
                    className="form-control"
                />
            )}

            {editor!.toLowerCase() === "dropdown" && (
                <select
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    onBlur={
                        (e: React.FormEvent<HTMLSelectElement>) =>
                            console.log(e) /* TODO: validate field value */
                    }
                    className="form-control"
                >
                    {options &&
                        options.map(option => (
                            <option key={option} value={option.split('|')[1]}>
                                {option.split('|')[0]}
                            </option>
                        ))}
                </select>
            )}

            {/* TODO - display validation error */}
        </div>
    )
}

Field.defaultProps = {
    editor: "textbox"
};