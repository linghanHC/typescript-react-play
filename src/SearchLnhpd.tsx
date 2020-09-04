import React from 'react';
import { useFetch } from './hooks/useFectch'

export function SearchLnhpd(values) {

    function getUrl() {
        console.log("2222222222SearchLnhpd");
        console.log({ values });
        return "https://health-products.canada.ca/api/natural-licences/productlicence/?lang=en&type=json&id=80030151";
    }

    const temp = getUrl();

    const { json, loading } = useFetch(temp);

    return { json, loading };
}
