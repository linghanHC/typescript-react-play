import React, { useState, useEffect, useRef } from 'react';

// TODO the onSubmit parameter and return value handleSubmit can be removed 
// they are not really used in my form
const useCustomForm = ({
    initialValues,
    onSubmit
}) => {

    const [values, setValues] = useState(initialValues || {});
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [onSubmitting, setOnSubmitting] = useState<boolean>(false);
    const [onBlur, setOnBlur] = useState<boolean>(false);

    const formRendered = useRef(true);

    useEffect(() => {
        if (!formRendered.current) {
            setValues(initialValues);
            setErrors({});
            setTouched({});
            setOnSubmitting(false);
            setOnBlur(false);
        }
        formRendered.current = false;
    }, [initialValues]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        const { id, value } = target;
        event.persist();
        setValues({ ...values, [id]: value });
    };

    const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        const { name } = target;
        setTouched({ ...touched, [name]: true });
        setErrors({ ...errors });
    };

    const handleSubmit = (event: any) => {
        if (event) event.preventDefault();
        setErrors({ ...errors });
        console.log(".........handleSubmit");
        onSubmit({ values, errors });
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
    };
}

export default useCustomForm;